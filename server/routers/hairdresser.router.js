import Router from 'express';
import HairdresserController from '../controller/hairdresser.controller.js';

const hairdresserController = new HairdresserController();
const hairdresserRouter = new Router();

hairdresserRouter.get('/getHairdresser', hairdresserController.gethairdresser);

export default hairdresserRouter;