import Router from 'express';
import VistitorController from '../controller/visitor.controller.js';

const visitorController = new VistitorController();
const visitorRouter = new Router();

visitorRouter.get('/getVisitor', visitorController.getvisitor);
visitorRouter.post('/createVisitor', visitorController.createVisitor);
visitorRouter.get('/getVisitor/:id', visitorController.getVisitorById);
visitorRouter.put('/updateVisitor', visitorController.updateVisitor);
visitorRouter.delete('/deleteVisitor/:id', visitorController.deleteVisitor);
visitorRouter.put('/updatepasswordVisitor/:id', visitorController.updatepasswordVisitor);

export default visitorRouter;