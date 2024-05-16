import Router from 'express';
import DepController from '../controller/dep.controller.js';

const depController = new DepController();
const depRouter = new Router();

depRouter.get('/getDep', depController.getdep);

export default depRouter;