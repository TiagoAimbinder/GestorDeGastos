import { UserRep } from '../repositories/User.repository.js';

export class UserService {


  constructor() {
    this.UserRep = new UserRep();
  }

  register = async (user) => {
    const { usu_name, usu_email } = user;
    const role_id = 2; 
    const emailRegex = /^\S+@\S+\.\S+$/;

    try {
      const userDB = await this.UserRep.findByName(usu_name);      
      if (userDB) throw { message: 'Ya existe un usuario registrado con ese nombre.', statusCode: 400, code: '' };  
      if (!emailRegex.test(usu_email)) throw { message: 'Formato de correo electrónico inválido.', statusCode: 400, code: '' }
      await this.UserRep.create(user, role_id);
    } catch (err) {
      throw err      
    }
  }

  getAll = async () => {
    try {
      const PARAMS = ['usu_id','usu_name']
      const users = await this.User.getAll(PARAMS)
      if (!users) throw { message: 'No se encontraron usuarios.', statusCode: 404, code: ''} 
      return users; 
    } catch (err) {
      throw err; 
    }
  }

}; 