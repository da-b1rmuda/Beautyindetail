import Router from 'express';
import UserController from '../controller/user.controller.js';

const userController = new UserController();
const userRouter = new Router();

userRouter.post('/login', userController.Login);
userRouter.get('/getUsers', userController.getusers);
userRouter.get('/emailUsers/:email', userController.emailUsers);
userRouter.post('/emailSending/:email', userController.emailSending);
export default userRouter;