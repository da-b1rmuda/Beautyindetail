import Router from 'express';
import MasterController from '../controller/master.controller.js';

const masterController = new MasterController();
const masterRouter = new Router();

masterRouter.get('/getMasters', masterController.getmaster);
masterRouter.get('/getMasters/:id', masterController.getmasterById);
masterRouter.get('/getMasterByCategory/:id', masterController.getMasterByCategory);
masterRouter.post('/addMaster', masterController.addMaster);
masterRouter.put('/updateMaster/:id', masterController.updateMaster);
masterRouter.delete('/deleteMaster/:id', masterController.deleteMaster);
export default masterRouter;