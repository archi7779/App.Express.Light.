import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './IMiddleWare.interface';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleWare {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload && typeof payload === 'object' && 'email' in payload) {
					req.user = payload.email;
					next();
				} else {
					next();
				}
			});
		} else {
			next();
		}
	}
}
