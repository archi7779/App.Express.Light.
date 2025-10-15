import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'имаил неверный' })
	email!: string;

	@IsString({ message: 'нет пароля' })
	password!: string;

	@IsString({ message: 'нет имени' })
	name!: string;
}
