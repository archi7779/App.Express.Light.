import { IsEmail, IsString } from 'class-validator';
export class UserLoginDto {
	@IsEmail({}, { message: 'имаил неверный' })
	email!: string;

	password!: string;
}
