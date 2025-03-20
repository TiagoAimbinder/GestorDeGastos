import { Router } from "express";
import { ManangementWeekController } from "../controller/ManangementWeek.controller.js";
import { ManangementWeekRequest } from "../middlewares/ManangementWeek.middleware.js";
import { authJWT } from "../config/utils.js";

export class RouteManangementWeek {

  constructor() {
    this.ManangementWeekReq = new ManangementWeekRequest();
    this.ManangementWeekCtr = new ManangementWeekController();

    this.routeManangementWeek = Router();
  }


  routesInit  = () => {
    this.routeManangementWeek.post("/create", authJWT, this.ManangementWeekReq.validateCreate, this.ManangementWeekCtr.create)
    this.routeManangementWeek.get("/getAll", authJWT, this.ManangementWeekCtr.getAll )
    this.routeManangementWeek.put("/update/:his_id/:usu_id", authJWT, this.ManangementWeekReq.validateUpdate, this.ManangementWeekCtr.updateMovement);
    this.routeManangementWeek.put("/delete/:id", authJWT, this.ManangementWeekReq.validateDelete, this.ManangementWeekCtr.deleteMovement );
    this.routeManangementWeek.put("/migrate/:usu_id", this.ManangementWeekCtr.goToGeneral)

    return this.routeManangementWeek;
  }

}