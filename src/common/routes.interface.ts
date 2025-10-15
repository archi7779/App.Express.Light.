import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleWare } from './IMiddleWare.interface';

export interface ICustomRoute {
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	middlewares?: IMiddleWare[];
}
