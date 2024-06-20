import { Router } from "express";
import { ManangementWeekController } from "../controller/ManangementWeek.controller.js";
import { ManangementWeekRequest } from "../middlewares/ManangementWeek.middleware.js";
import { authJWT } from "../config/utils.js";

const routeManangementWeek = Router();
const manangementWeekController = new ManangementWeekController(); 
const manangementWeekRequest = new ManangementWeekRequest(); 

routeManangementWeek.post("/create", authJWT, manangementWeekRequest.validateCreate, manangementWeekController.createMovement)
routeManangementWeek.get("/getAll", authJWT, manangementWeekController.getAllMovements )
routeManangementWeek.put("/update/:his_id/:usu_id", authJWT, manangementWeekRequest.validateUpdate ,manangementWeekController.updateMovement);
routeManangementWeek.put("/delete/:id", authJWT, manangementWeekRequest.validateDelete, manangementWeekController.deleteMovement );
routeManangementWeek.put("/migrate/:usu_id", manangementWeekController.goToGeneral)

export default routeManangementWeek