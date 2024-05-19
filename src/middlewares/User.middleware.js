import Joi from "joi";
import { getToken } from "../config/utils.js";


const { LOGIN_KEY, REGISTER_KEY } = process.env

export class UserRequest {

  // Schemas -------------- 
  LoginSchema = Joi.object({
    usu_name: Joi.string().required(),
    usu_password: Joi.string().required(),
  });

  RegisterSchema = Joi.object({
    usu_name: Joi.string().required(),
    usu_password: Joi.string().required(),
    usu_email: Joi.string().required(),
    role_id: Joi.number().optional(),
  })

  // Validaciones -------------- 
  validateLogin = (req, res, next) => {
    const loginKey = getToken(req);
    if (loginKey !== LOGIN_KEY) {
      res.status(400).json({message: "Login key inválida"})
      return;
    }
    const { error } = this.LoginSchema.validate(req.body)
    if (error) { 
      res.status(400).json({error: error.details[0].message})
      return
    }
    next(); 
  }

  validateRegister = (req, res, next) => {
    const registerKey = getToken(req);
    if (registerKey !== REGISTER_KEY) {
      res.status(400).json({message: "Register key inválida"})
      return;
    }
    const { error } = this.RegisterSchema.validate(req.body)
    if (error) { 
      res.status(400).json({error: error.details[0].message})
      return
    }
    next(); 
  }

}; 