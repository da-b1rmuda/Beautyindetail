import Router from 'express';
import CategoryController from '../controller/category.controller.js';

const categoryController = new CategoryController();
const categoryRouter = new Router();

categoryRouter.get('/getCategory', categoryController.getcategory);
categoryRouter.get('/getCategory/:id', categoryController.getCategoryById);
categoryRouter.post('/addCategory', categoryController.addCategory);
categoryRouter.put('/updateCategory/:id', categoryController.updateCategory);
categoryRouter.delete('/deleteCategory/:id', categoryController.deleteCategory);
export default categoryRouter;