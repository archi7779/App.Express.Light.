import express, { Express } from 'express';
import { LoggerService } from './logger/logger.service';
import { UserControlled } from './common/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { inject, injectable } from 'inversify';
import { TYPES } from './inversifyJs/types';
import { ILogger } from './logger/logger.interface';
import { json } from 'body-parser';

import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
import { AuthMiddleware } from './common/auth.middleware';

@injectable()
export class App {
	app: Express;
	server: any;
	port: number;
	constructor(
		@inject(TYPES.ILoggerService) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserControlled,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaServie) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}
	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}
	useRouters() {
		this.app.use('/users', this.userController.router);
	}
	useExeptionFilters() {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
	public async init() {
		this.useMiddleware();
		this.useRouters();
		this.useExeptionFilters();
		this.prismaService.conntect();
		this.server = this.app.listen(this.port);
		this.logger.log('server is running');
	}
}
