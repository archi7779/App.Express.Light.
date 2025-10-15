import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../inversifyJs/types';

@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.ILoggerService) private logger: ILogger) {
		this.client = new PrismaClient();
	}
	async conntect(): Promise<void> {
		try {
			this.logger.log('ПАДлючаюсь к призме');
			await this.client.$connect();
			this.logger.log('ПАДлючился к призме');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('Ошибка падлючения к призме');
			}
		}
	}
	async dissconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
