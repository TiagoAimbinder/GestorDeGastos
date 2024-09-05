
import { Router } from "express";
import { SaleHistoryController } from "../controller/SaleHistory.controller.js";
import { SaleHistoryMiddleware } from "../middlewares/Sale.middleware.js";
import { authJWT } from "../config/utils.js"

const saleHistoryCtr = new SaleHistoryController();
const saleHistoryMwr = new SaleHistoryMiddleware();
const routeSale = Router();


routeSale.post('/create', authJWT, saleHistoryMwr.validateCreate, saleHistoryCtr.createSale);
routeSale.get('/getMonthly', authJWT, saleHistoryMwr.ValidateUsuId, saleHistoryCtr.getMonthlySales);
routeSale.get('/getTotals', authJWT, saleHistoryMwr.ValidateUsuId, saleHistoryCtr.getTotals);

export { routeSale }; 