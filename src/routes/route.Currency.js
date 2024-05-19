import { Router } from "express";
import { CurrencyController } from "../controller/Currency.controller.js";


const routeCurrency = Router();


const currencyController = new CurrencyController();

routeCurrency.get('/getAll', currencyController.getAllCurrencyTypes);

export default routeCurrency;