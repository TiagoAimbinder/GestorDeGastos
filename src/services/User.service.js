import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; 
import { User, LogHistory } from '../config/db.js';
import { encryptData } from '../config/utils.js'

export class UserService {

  registerUser = async (usu_name, usu_password, usu_email, role_id) => {
    try { 
      const userCreated = await User.create({
        usu_name: usu_name,
        usu_password: await encryptData(usu_password),
        usu_email: usu_email, 
        role_id: role_id,
        usu_token: null
      })
      const result = {message: "Usuario creado correctamente."}
      return result;
    } 
    catch (err) {
      throw err
    }
  }

  loginUser = async (user, usu_password) => {
    try {

      // Validación de contraseña: 
      const validPassword = await bcrypt.compare(usu_password, user.usu_password)

      if (validPassword === false || validPassword === undefined || validPassword === null) {
        const result = {message: "Contraseña incorrecta", statusCode: 401}
        return result; 
      } 

      // Creo el log del usuario: 
      await LogHistory.create({
        usu_id: user.usu_id
      });

      // Creo el token y actualizo el usuario en la DB
      const token = jwt.sign({username: user.usu_name}, process.env.SECRET_KEY, {expiresIn:'1h'});
      await User.update({usu_token: token}, {where: {usu_id: user.usu_id}});

      // Devuelvo el token al Front: 
      const result = { message: "Login correcto", token: token, usu_id: user.usu_id};
      return result; 
    } 
    catch(err) {
      throw err
    }
  }


}; 