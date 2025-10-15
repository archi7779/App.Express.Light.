import { Router, Response } from 'express';
import { LoggerService } from '../logger/logger.service';
import { ICustomRoute } from './routes.interface';
import { injectable } from 'inversify';
export { Router } from 'express';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: LoggerService) {
		this._router = Router();
	}
	get router() {
		return this._router;
	}
	public send<T>(res: Response, code: number, message: T) {
		return res.status(200).type('json').status(code).json(message);
	}
	public ok<T>(res: Response, message: T) {
		this.send<T>(res, 200, message);
	}
	public created(res: Response) {
		res.sendStatus(201);
	}
	protected bindRoutes(routes: ICustomRoute[]) {
		for (const route of routes) {
			this.logger.log(`[${route.method}]${route.path}`);
			const middlewares = route.middlewares?.map((m) => m.execute.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}
