import express from 'express';

const userRouter = express.Router();

userRouter.get('/login', (req, res) => {
	res.send('login');
});

export { userRouter };
