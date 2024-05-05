import { Router } from "express";
import { UserController } from "../controller/User.controller.js";
import { UserRequest } from "../middlewares/User.middleware.js";

const routeUser = Router();

const userController = new UserController()
const userRequest = new UserRequest();

routeUser.post("/login", userRequest.validateLogin, userController.loginUser); 
routeUser.post("/register", userRequest.validateRegister, userController.registerUser); 

export default routeUser;
