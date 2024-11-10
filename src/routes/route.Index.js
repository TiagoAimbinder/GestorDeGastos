import { Router } from "express";
import routeUser from "./route.User.js";
import routeManangement from "./route.Manangement.js";
import routeManangementWeek from "./route.ManangementWeek.js";
import routeCategory from "./route.Category.js";
import routeExpenses from "./route.Expenses.js";
import routeCurrency from "./route.Currency.js";
import routeSale from "./route.Sale.js"

const routeIndex = Router(); 

routeIndex.use('/user', routeUser);
routeIndex.use('/manangement', routeManangement);
routeIndex.use('/manangementWeek', routeManangementWeek);
routeIndex.use('/category', routeCategory);
routeIndex.use('/expenses', routeExpenses);
routeIndex.use('/currency', routeCurrency);
routeIndex.use('/saleHistory', routeSale);

export default routeIndex;