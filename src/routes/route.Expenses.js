import { Router } from "express";
import { ExpensesController } from "../controller/Expenses.controller.js";
import { ExpensesRequest } from "../middlewares/Expenses.middleware.js";
import { authJWT } from '../config/utils.js'

const routeExpenses = Router()
const expensesController = new ExpensesController();
const expensesRequest = new ExpensesRequest();

routeExpenses.post('/create', authJWT, expensesRequest.validateCreate, expensesController.createExpenses);
routeExpenses.get('/getAll/:usu_id', authJWT, expensesRequest.validateGetAll, expensesController.getAll);
routeExpenses.delete('/delete/:exp_id/:usu_id', authJWT, expensesRequest.validateDelete, expensesController.deleteExpense);
routeExpenses.put('/update/:exp_id/:usu_id', authJWT, expensesRequest.validateUpdate, expensesController.updateExpense);

export default routeExpenses; 