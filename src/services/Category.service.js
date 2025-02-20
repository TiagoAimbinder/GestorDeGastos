import { Database } from '../config/db.js'
import { CategoryRep } from '../repositories/Category.repository.js';
import { UserRep } from '../repositories/User.repository.js';


export class CategorySrv {

  constructor() {
    this.CategoryRep = new CategoryRep();
    this.UserRep = new UserRep();
  }

  get sequelize() { return Database.sequelize }

  create = async (usu_id, cat_name, cat_color) =>  {

    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.UserRep.findByID(usu_id, transaction);
      if (!user) throw { statusCode: 404, message: 'El usuario no existe', code: '' }

      // ⚠️ | ALL USERS CAN CREATE CATEGORIES
      // if (user.role_id !== 1) throw { statusCode: 401, message: 'El usuario no tiene permisos para crear categorías', code: '' };

      /**
       * Find category by name, If exist throw error
       * @param { String } cat_name
       */
      const catByName = await this.CategoryRep.findByName(cat_name, transaction);
      if (catByName) throw { statusCode: 400, message: 'Ya existe una categoría con ese nombre', code: '' };

      /**
       * Create category
       * @param { String } cat_name
       * @param { String } cat_color
       */
      const color = cat_color === null ? "#FFFFFF" : cat_color;
      await this.CategoryRep.create({ cat_name, cat_color: color }, transaction);

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback()
      throw err; 
    }
  }; 

  updateCategory = async (data) => {

    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.UserRep.findByID(data.usu_id, transaction);
      if (!user) throw { statusCode: 404, message: 'El usuario no existe', code: '' }

      // ⚠️ | ALL USERS CAN UPDATE CATEGORIES
      // if (user.role_id !== 1) throw { statusCode: 401, message: 'El usuario no tiene permisos para crear categorías', code: '' };

      /**
       * Find category by name, If doesn't exist throw error
       * @param {Int} cat_id
       */
      const category = await this.CategoryRep.findByID(data.cat_id, transaction);
      if (!category) throw { message: 'La categoría no existe', statusCode: 404, code: '' }

      /** 
       * cat_color validation. If data.cat_color is null, then use the previous value.
       * @param {String} cat_color
       */
      const cat_color = data.cat_color === null ? category.cat_color : data.cat_color;
      const cat = { cat_id: data.cat_id, cat_name: data.cat_name, cat_color: cat_color }

      await this.CategoryRep.update(cat, transaction); 

      await transaction.commit();
    }
    catch (err) {
      await transaction.rollback()
      throw err
    }
  };

  getAll = async (usu_id) => { 
    try {
      const user = await this.UserRep.findByID(usu_id);
      if (!user) throw { statusCode: 404, message: 'El usuario no existe', code: '' }

      // ⚠️ | ALL USERS CAN GET ALL CATEGORIES
      // if (user.role_id !== 1) throw { statusCode: 401, message: 'El usuario no tiene permisos para crear categorías', code: '' };

      const categories = await this.CategoryRep.getAll();
      if (!categories || categories.length === 0 ) throw { statusCode: 404, message: 'No se encontraron categorías', code: '' }
      return categories; 
    } catch (err) {
      throw err; 
    }
  }

  deleteCategory = async (usu_id, cat_id) => {

    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.User.findByID(usu_id, transaction); 
      if (!user) throw { statusCode: 404, message: 'El usuario no existe', code: '' }

      // ⚠️ | ALL USERS CAN DELETE CATEGORIES
      // if (user.role_id !== 1) throw { statusCode: 401, message: 'El usuario no tiene permisos para crear categorías', code: '' };

      const category = await this.CategoryRep.findByID(cat_id, transaction);
      if (!category) throw { statusCode: 404, message: 'La categoría no existe', code: '' }; 

      await this.CategoryRep.delete(cat_id, transaction);
      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err
    }
  }
}; 