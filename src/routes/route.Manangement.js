import { Router } from "express";
import { authJWT } from "../config/utils.js";
import { ManangementController } from "../controller/Manangement.controller.js"

const routeManangement = Router();
const manangementController = new ManangementController()

/* Funcionalidades:
  - Crear movimiento (ingreso-egreso) | Post 
  - Obtener todos los movimientos | Get
  - Modificar movimiento. (por id) | Put 
  - Eliminar movimiento (por id) - Solo se cambia de estado, no se borra de la base de datos. | Put
*/

routeManangement.post("/create", manangementController.createMovement)

routeManangement.get("/getAll", )

routeManangement.put("/update", );
routeManangement.put("/delete", );

export default routeManangement