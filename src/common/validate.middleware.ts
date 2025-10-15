import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './IMiddleWare.interface';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export class ValidateMiddleWare implements IMiddleWare {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction) {
		const instance = plainToClass(this.classToValidate, body);
		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
