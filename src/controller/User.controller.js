import { User } from "../config/db.js";
import { UserService } from "../services/User.service.js";

export class UserController {

  registerUser = async (req, res) => {
    const { usu_name, usu_password, usu_email } = req.body;
    const user = await User.findOne({where: {usu_name}});
    const emailRegex = /^\S+@\S+\.\S+$/;
    const role_id = 2;

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

        if (result.statusCode === 401) {
          return res.status(401).json({ message: result.message });
        }
        res.status(200).json(result);
    } 
    catch (err) {
        res.status(500).json({ message: "Error de servidor | loginUser", error: err });
    }
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: ['usu_id', 'usu_name'] // Especifica los campos que quieres obtener
      });
      res.status(200).json({users: users});
    }
    catch(err) {
      res.status(500).json({message: "Error de servidor | getAllUsers", error: err})
    }
  }

  async validateToken (req, res) {
    const { usu_id } = req.body;
    const authHeaders = req.headers.authorization;

    if(!authHeaders) {   
        return res.status(400).json({message: "No se ha enviado ningun token."});
    }           

    const usu_token = authHeaders.split(' ')[1]; 

    try {
        const user = await User.findOne({where: {usu_id}});
        if (!user) {
            return res.status(400).json({message: "No existe un usuario registrado con ese ID."});
        }; 

        if (usu_token !== user.dataValues.usu_token) {
            await User.update({usu_token: null}, {where: {usu_id: usu_id}});
            return res.status(400).json({message: "El token ingresado no coincide con el token registrado."});
        };
        res.status(200).json({valid: true})
    } 
    catch(err) {
        res.status(500).json({ message: "Error de servidor | validateToken - Controller", error: err });
    } 
  };
}