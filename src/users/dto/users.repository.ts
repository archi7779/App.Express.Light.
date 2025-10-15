import { UserModel } from '@prisma/client';
import { IUsersRepository } from './users.repository.interface';
import { User } from '../user.entity';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../../config/config.service.interface';
import { TYPES } from '../../inversifyJs/types';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaServie) private prismaService: PrismaService) {}

	async create({ email, password, name }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	async find(email: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
		});
	}
}
