
import { Router } from "express";
import { SaleHistoryController } from "../controller/SaleHistory.controller.js";
import { SaleHistoryMiddleware } from "../middlewares/Sale.middleware.js";
import { authJWT } from "../config/utils.js"



export class RouteSale {

  constructor() {
    this.SaleHistoryReq = new SaleHistoryMiddleware();    
    this.SaleHistoryCtr = new SaleHistoryController();
    this.routeSale = Router();
  }

  routesInit = () => {
    this.routeSale.post('/create', authJWT, this.SaleHistoryReq.validateCreate, this.SaleHistoryCtr.create);
    this.routeSale.get('/getMonthly', authJWT, this.SaleHistoryReq.ValidateUsuId, this.SaleHistoryCtr.monthlySales);
    this.routeSale.get('/getTotals', authJWT, this.SaleHistoryReq.ValidateUsuId, this.SaleHistoryCtr.totals);
    return this.routeSale; 
  }

}