import { Router } from "express";
import { UserController } from "../controller/User.controller.js";
import { UserRequest } from "../middlewares/User.middleware.js";
import { authJWT } from "../config/utils.js";

const routeUser = Router();

const userController = new UserController()
const userRequest = new UserRequest();

routeUser.post("/login", userRequest.validateLogin, userController.loginUser); 
routeUser.post("/register", userRequest.validateRegister, userController.registerUser); 
routeUser.get("/getAll", authJWT, userController.getAllUsers);
routeUser.post("/validateToken", authJWT, userController.validateToken);

export default routeUser;
