import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../inversifyJs/types';
import { LoggerService } from '../logger/logger.service';
import { UserLoginDto } from '../users/dto/user-login.dto';
import { UserRegisterDto } from '../users/dto/user-register.dto';
import { BaseController } from './base.controller';
import { Response, Request, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IUserService } from '../users/dto/user.service.interface';
import { ValidateMiddleWare } from './validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { GuardMiddleware } from './guard.middleware';
import { PrismaService } from '../database/prisma.service';
@injectable()
export class UserControlled extends BaseController {
	constructor(
		@inject(TYPES.ILoggerService) logger: LoggerService,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaServie) private prismaService: PrismaService,
	) {
		super(logger);
		this.bindRoutes([
			{
				func: this.login,
				method: 'post',
				path: '/login',
				middlewares: [new ValidateMiddleWare(UserLoginDto)],
			},
			{
				func: this.register,
				method: 'post',
				path: '/register',
				middlewares: [new ValidateMiddleWare(UserRegisterDto)],
			},
			{
				func: this.info,
				method: 'get',
				path: '/info',
				middlewares: [new GuardMiddleware()],
			},
		]);
	}
	async info({ user }: Request, res: Response, next: NextFunction) {
		const currentUser = await this.userService.findUser(user);
		this.ok(res, { id: currentUser?.id, email: currentUser?.email, name: currentUser?.name });
	}
	async login(
		{ body: { email, password } }: Request<object, object, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const currentUser = await this.userService.loginUser({ email, password });
		if (!currentUser) {
			return next(new HTTPError(401, 'Неверный эмеил или пароль'));
		}
		const jwt = await this.signJWT(email, this.configService.get('SECRET'));
		// res.cookie('JWT', jwt, {
		// 	httpOnly: true, // Защита от XSS
		// 	secure: process.env.NODE_ENV === 'production', // HTTPS в production
		// 	sameSite: 'strict', // Защита от CSRF
		// 	maxAge: 24 * 60 * 60 * 1000, // 24 часа
		// 	path: '/', // Доступно для всех путей
		// });
		this.ok(res, { jwt });
	}

	async register(
		{ body }: Request<object, object, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'user alredy registered'));
		}
		this.ok(res, { email: result.email, id: result.id });
	}
	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}

//Сервис - бизнес логика
//Контролер - роуты + результат сервисов
