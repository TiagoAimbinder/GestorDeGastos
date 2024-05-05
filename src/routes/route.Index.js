import { Router } from "express";
import routeUser from "./route.User.js";
import routeManangement from "./route.Manangement.js";
const routeIndex = Router(); 

routeIndex.use('/user', routeUser);
routeIndex.use('/manangement', routeManangement);

export default routeIndex;