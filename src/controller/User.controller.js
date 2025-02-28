import { UserService } from "../services/User.service.js";

export class UserController {
  
  constructor() {
    this.UserSrv = new UserService();
  }

  /**
  * REFACTORIZED: 
  * - ✅ | Login -> AuthCtr
  * - ✅ | Register
  * - ✅ | Get all
  * - ✅ | Validate token -> AuthCTR
  */

  registerUser = async (req, res) => { 
    const { usu_name, usu_password, usu_email } = req.body;

    try {
      const user = { usu_name, usu_password, usu_email };
      await this.UserSrv.register(user);
      res.status(200).json({ message: 'Usuario registrado correctamente', success: true })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al registrar el usuario', success: false, code: err.code || ''})
    }
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.UserSrv.getAll();
      res.status(200).json({ message: 'Usuarios obtenidos correctamente', success: true, users: users})
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al obtener los usuarios', success: false, code: err.code || ''})
    }
  }

}