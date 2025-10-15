import { Request, Response, NextFunction } from 'express';
import { IMiddleWare } from './IMiddleWare.interface';
import { JwtPayload, verify } from 'jsonwebtoken';

export class GuardMiddleware implements IMiddleWare {
	execute(req: Request, res: Response, next: NextFunction): void {
		console.log('hello');
		console.log('NUKA', req.headers.cookie);
		if (req.user) {
			next();
		} else {
			res.status(401).send({ error: { message: 'need to autozire' } });
		}
	}
}
