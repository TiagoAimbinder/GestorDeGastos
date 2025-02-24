import { Router } from "express";
import { ManangementController } from "../controller/Manangement.controller.js"
import { ManangementRequest } from "../middlewares/Manangement.middleware.js"
import { authJWT } from "../config/utils.js"


export class RouteManangement {

  constructor() {
    this.ManangementReq = new ManangementRequest();
    this.ManangementCtr = new ManangementController();

    this.routeManangement = Router();
  }

  routesInit = () => {
    this.routeManangement.post("/create", authJWT, this.ManangementReq.validateCreate, this.ManangementCtr.create)
    this.routeManangement.get("/getAll", authJWT, this.ManangementCtr.getAll)
    this.routeManangement.put("/update/:his_id/:usu_id", authJWT, this.ManangementReq.validateUpdate, this.ManangementCtr.updateMovement);
    this.routeManangement.put("/delete/:id", authJWT, this.ManangementReq.validateDelete, this.ManangementCtr.delete);
    return this.routeManangement;
  }

}