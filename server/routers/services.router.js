import Router from 'express';
import ServicesController from '../controller/services.controller.js';

const servicesController = new ServicesController();
const servicesRouter = new Router();

servicesRouter.get('/getServices', servicesController.getservices);
servicesRouter.get('/getServices/:id', servicesController.getServicesById);
servicesRouter.get('/getServicesByCategory/:id', servicesController.getServicesByCategory);
servicesRouter.post('/addServices', servicesController.addServices);
servicesRouter.put('/updateServices/:id', servicesController.updateServices);
servicesRouter.delete('/deleteServices/:id', servicesController.deleteServices);
export default servicesRouter;