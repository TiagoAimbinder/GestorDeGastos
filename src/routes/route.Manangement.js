import { Router } from "express";
import { ManangementController } from "../controller/Manangement.controller.js"
import { ManangementRequest } from "../middlewares/Manangement.middleware.js"
import { authJWT } from "../config/utils.js"

const routeManangement = Router();
const manangementController = new ManangementController(); 
const manangementRequest = new ManangementRequest(); 


routeManangement.post("/create", authJWT, manangementRequest.validateCreate, manangementController.createMovement)
routeManangement.get("/getAll", authJWT, manangementController.getAllMovements )
routeManangement.put("/update/:his_id/:usu_id", authJWT, manangementRequest.validateUpdate ,manangementController.updateMovement);
routeManangement.put("/delete/:id", authJWT, manangementRequest.validateDelete, manangementController.deleteMovement );


export default routeManangement