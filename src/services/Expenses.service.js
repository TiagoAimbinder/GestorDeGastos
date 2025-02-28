import { Database } from "../config/db.js";

import { UserRep } from "../repositories/User.repository.js";
import { CategoryRep } from "../repositories/Category.repository.js";
import { ExpenseRep } from "../repositories/Expense.repository.js";


export class ExpensesService {

  constructor() {
    this.UserRep = new UserRep();
    this.CategoryRep = new CategoryRep();
    this.ExpenseRep = new ExpenseRep();
  };

  get sequelize() { return Database.sequelize }

  create = async(data) => {
    const { usu_id, cat_id, ...expense } = data;
    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.UserRep.findByID(usu_id, transaction);
      if (!user) throw { message: 'El usuario no existe', statusCode: 404, code: '' }

      const category = await this.CategoryRep.findByID(cat_id, transaction);
      if (!category) throw { message: 'La categoría no existe', statusCode: 404, code: '' }

      await this.ExpenseRep.create(expense, cat_id, transaction);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err; 
    }
  }

  getAll = async (usu_id) => { 
    try {
      const user = await this.UserRep.findByID(usu_id);
      if (!user) throw { message: 'El usuario no existe', statusCode: 404, code: '' }
      return await this.ExpenseRep.getAll();
    } catch (err) {
      throw err; 
    }
  }

  update = async (exp_id, usu_id, exp) => {

    const transaction = await this.sequelize.transaction();

    const { exp_name, exp_amount, exp_percentVta, cat_id } = exp;

    try {
      const user = await this.UserRep.findByID(usu_id, transaction);
      if (!user) throw { message: 'El usuario no existe', statusCode: 404, code: '' };

      const category = await this.CategoryRep.findByID(cat_id, transaction);
      if (!category) throw { message: 'La categoría no existe', statusCode: 404, code: '' };

      const expense = await this.ExpenseRep.findByID(exp_id, transaction); 
      if (!expense) throw { message: 'El gasto no existe', statusCode: 404, code: '' };

      const expObj = { exp_name, exp_amount, exp_percentVta, cat_id }

      await this.ExpenseRep.update(expObj, exp_id, transaction);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err 
    }
  }; 

  delete = async (usu_id, exp_id) => {
    try {
      const user = await this.UserRep.findByID(usu_id);
      if (!user) throw { message: 'El usuario no existe', statusCode: 404, code: '' };

      const expense = await this.ExpenseRep.findByID(exp_id); 
      if (!expense) throw { message: 'El gasto no existe', statusCode: 404, code: '' };

      await this.ExpenseRep.delete(exp_id);
    } catch (err) {
      throw err; 
    }
  };


}; 