import { Router } from "express";
import { ExpensesController } from "../controller/Expenses.controller.js";
import { ExpensesRequest } from "../middlewares/Expenses.middleware.js";
import { authJWT } from '../config/utils.js'

const routeExpenses = Router()
const expensesController = new ExpensesController();
const expensesRequest = new ExpensesRequest();


export default routeExpenses; 


export class RouteExpenses {

  constructor() {
    this.ExpensesReq = new ExpensesRequest();
    this.ExpensesCtr = new ExpensesController();

    this.routeExpenses = Router();
  }

  routesInit = () => {
    this.routeExpenses.post('/create', authJWT, this.ExpensesReq.validateCreate, this.ExpensesCtr.create);
    this.routeExpenses.get('/getAll/:usu_id', authJWT, this.ExpensesReq.validateGetAll, this.ExpensesCtr.getAll);
    this.routeExpenses.delete('/delete/:exp_id/:usu_id', authJWT, this.ExpensesReq.validateDelete, this.ExpensesCtr.delete);
    this.routeExpenses.put('/update/:exp_id/:usu_id', authJWT, this.ExpensesReq.validateUpdate, this.ExpensesCtr.update);

    return this.routeExpenses;
  }


}