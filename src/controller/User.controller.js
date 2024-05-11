import { User } from "../config/db.js";
import { UserService } from "../services/User.service.js";

export class UserController {

  registerUser = async (req, res) => {
    const { usu_name, usu_password, usu_email, role_id } = req.body;
    const user = await User.findOne({where: {usu_name}});
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(usu_email)) {
      return res.status(400).json({ message: "Formato de correo electrónico inválido." });
    }

    if (user) {
      res.status(400).json({message: "Ya existe un usuario registrado con ese nombre."});
      return;
    }

    try { 
      const userService = new UserService();
      const result = await userService.registerUser(usu_name, usu_password, usu_email, role_id);
      res.status(200).json(result);
    } 
    catch(err) {
      res.status(500).json({message: "Error de servidor | registerUser", error: err})
    }

  } 

  loginUser = async (req, res) => {
    const { usu_name, usu_password } = req.body;
    const user = await User.findOne({where: {usu_name}});

    if ( user === null || user === undefined ) {
        res.status(400).json({message: "No existe un usuario registrado con nombre."});
        return; 
    }

    try {
        const userService = new UserService();
        const result = await userService.loginUser(user.dataValues, usu_password);
        res.status(200).json(result);
    } 
    catch (err) {
        res.status(500).json({ message: "Error de servidor | loginUser", error: err });
    }
  }
}