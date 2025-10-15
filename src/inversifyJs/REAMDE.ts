// чтобы делать DI
//main.ts
//  appContainer.bind<UserControlled>(TYPES.UserController).to(UserControlled)
//     appContainer.bind<App>(TYPES.Application).to(App)
//     const app = appContainer.get<App>(TYPES.Application)
//     app.init();

// в файле модуля
// import 'reflect-metadata'

// @injectable()
//  constructor(
//         @inject(TYPES.ILoggerService) private logger: ILogger,
//         @inject(TYPES.UserController) private userController: UserControlled,
//         @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter
//     )


кароче ДИ - это по сути классы и их внедрение просто в другие классы
польза = легко тестировать! изоляция! можно модули ваще наверное на микросервисы распилить и разные команды будут 
их делать а потом мы их подключим в корневом апп
