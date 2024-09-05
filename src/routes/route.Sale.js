
import { Router } from "express";
import { SaleHistoryController } from "../controller/SaleHistory.controller.js";

const saleHistoryCtr = new SaleHistoryController();
const routeSale = Router();


routeSale.post('/create', saleHistoryCtr.createSale);
routeSale.get('/getMonthly', saleHistoryCtr.getMonthlySales);


export default routeSale; 