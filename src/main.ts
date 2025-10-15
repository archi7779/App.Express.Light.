import { Container } from 'inversify';
import { App } from './app';
import { ICustomRoute } from './common/routes.interface';
import { UserControlled } from './common/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './inversifyJs/types';
import { ILogger } from './logger/logger.interface';
import { UserService } from './users/dto/user.service';
import { IUserService } from './users/dto/user.service.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './database/prisma.service';
import { UsersRepository } from './users/dto/users.repository';

const API: ICustomRoute[] = [
	{
		func: (req, res) => {
			res.send('login');
		},
		method: 'get',
		path: '/login',
	},
	{
		func: (req, res) => {
			res.send('TOPTOP');
		},
		method: 'get',
		path: '/checkME',
	},
];
// Reflect.set;
// async function bootstrap() {
//     //DI руками
//     // const logger = new LoggerService()
//     // const app = new App(logger, new UserControlled(logger), new ExeptionFilter(logger));
//

// }
//DI через тс декораторы + рефлет.метада в либо inversify!

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
appContainer.bind<ExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter).inSingletonScope();
appContainer.bind<UserControlled>(TYPES.UserController).to(UserControlled).inSingletonScope();
appContainer.bind<IUserService>(TYPES.UserService).to(UserService).inSingletonScope();
appContainer.bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
appContainer.bind<PrismaService>(TYPES.PrismaServie).to(PrismaService).inSingletonScope();
appContainer.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();

appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
