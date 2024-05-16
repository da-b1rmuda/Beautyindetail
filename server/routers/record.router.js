import Router from 'express';
import RecordController from '../controller/record.controller.js';

const recordController = new RecordController();
const recordRouter = new Router();

recordRouter.get('/getRecord', recordController.getrecord);
recordRouter.get('/getRecord2', recordController.get2record);
recordRouter.post('/createRecord', recordController.createRecord);
recordRouter.get('/getRecord/:id', recordController.getRecordById);
recordRouter.post('/addRecord', recordController.addRecord);
recordRouter.put('/updateRecord/:id', recordController.updateRecord);
recordRouter.delete('/deleteRecord/:id', recordController.deleteRecord);
recordRouter.get('/getRecordbyService/:id',recordController.getRecordbyService)
recordRouter.get('/getRecordbyDay/:id',recordController.getRecordbyDay)
recordRouter.get('/getRecordbyCategory/:id',recordController.getRecordbyCategory)
recordRouter.get('/getRecordbyTime/:id',recordController.getRecordbyTime)
recordRouter.get('/revenueByMonth', recordController.getRevenueByMonth);
recordRouter.get('/recordCompleteness', recordController.checkRecordCompleteness);
recordRouter.get('/getRecordbyClient/:id',recordController.getRecordbyClient);
recordRouter.get('/delClient/:id',recordController.delClient)
export default recordRouter;