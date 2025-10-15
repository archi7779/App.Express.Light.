import { IUserService } from '../users/dto/user.service.interface';

export interface IUserController {
	userService: IUserService;
}
