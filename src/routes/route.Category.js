import { Router } from "express";
import { CategoryController } from "../controller/Category.controller.js";
import { CategoryRequest } from "../middlewares/Category.middleware.js";
import { authJWT } from '../config/utils.js'

const routeCategory = Router();

const categoryController = new CategoryController(); 
const categoryRequest = new CategoryRequest();

routeCategory.post('/create', authJWT, categoryRequest.validateCreate, categoryController.createCategory); 
routeCategory.get('/getAll/:usu_id', authJWT, categoryRequest.validateGetAll, categoryController.getAllCategories);
routeCategory.put('/update/:cat_id/:usu_id', authJWT, categoryRequest.validateUpdate, categoryController.updateCategory);
routeCategory.delete('/delete/:cat_id/:usu_id', authJWT, categoryRequest.validateDelete, categoryController.deleteCategory);

export default routeCategory;