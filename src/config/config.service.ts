import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../inversifyJs/types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config!: DotenvParseOutput;
	constructor(@inject(TYPES.ILoggerService) private logger: ILogger) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('не удалось прочитать файл .env или его нет');
		} else {
			this.logger.log('ConfigService Init');
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get<T extends number | string>(key: string): T {
		return this.config[key] as T;
	}
}
