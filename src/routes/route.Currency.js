import { Router } from "express";
import { CurrencyController } from "../controller/Currency.controller.js";



export class RouteCurrency {

  constructor() {
    this.CurrencyCtr = new CurrencyController();
    this.routeCurrency = Router();
  }

  routesInit = () => {
    this.routeCurrency.get('/getAll', this.CurrencyCtr.getAll);
    return this.routeCurrency;
  }
}