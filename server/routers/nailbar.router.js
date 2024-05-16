import Router from 'express';
import NailbarController from '../controller/nailbar.controller.js';

const nailbarController = new NailbarController();
const nailbarRouter = new Router();

nailbarRouter.get('/getNailbar', nailbarController.getnailbar);

export default nailbarRouter;