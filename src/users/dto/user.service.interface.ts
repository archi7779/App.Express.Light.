import { UserModel } from '@prisma/client';
import { UserLoginDto } from './user-login.dto';
import { UserRegisterDto } from './user-register.dto';

export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	loginUser: ({ email, password }: { email: string; password: string }) => Promise<boolean | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
	findUser: (email: string) => Promise<UserModel | null>;
}
