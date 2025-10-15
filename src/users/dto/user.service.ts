import { inject, injectable } from 'inversify';
import { User } from '../user.entity';
import { UserLoginDto } from './user-login.dto';
import { UserRegisterDto } from './user-register.dto';
import { IUserService } from './user.service.interface';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../inversifyJs/types';
import { UsersRepository } from './users.repository';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private userRepository: UsersRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const salt = this.configService.get<number>('SALT') ?? 10;
		const newUser = new User(email, name);
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		return await this.userRepository.create(newUser);
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
	async loginUser({ email, password }: UserLoginDto): Promise<boolean | null> {
		const existedUser = await this.userRepository.find(email);

		if (!existedUser) {
			return null;
		} else {
			const userToLogin = new User(existedUser.email, existedUser.name);
			return await userToLogin.comparePassword(password, existedUser.password);
		}
	}
	async findUser(email: string): Promise<UserModel | null> {
		return await this.userRepository.find(email);
	}
}
