import Router from 'express';
import MakeupController from '../controller/makeup.controller.js';

const makeupController = new MakeupController();
const makeupRouter = new Router();

makeupRouter.get('/getMakeup', makeupController.getmakeup);

export default makeupRouter;