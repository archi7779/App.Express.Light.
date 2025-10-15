export interface ILogger {
	log: (msg: string) => void;
	error: (err: string) => void;
	warn: () => void;
}
