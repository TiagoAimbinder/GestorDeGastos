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
      const user = await this.UserRep.findByID(usu_id, transaction);
      if (!user) throw { message: 'El usuario no existe', statusCode: 404, code: '' }
      return await this.ExpenseRep.getAll();
    } catch (err) {
      throw err; 
    }
  }




  deleteExpense = async (exp_id) => {
    try {
      const expenseDeleted = await Expenses.destroy({ where: { exp_id } });
      const result = { message: "Gasto eliminado correctamente", exp: expenseDeleted }
      return result; 
    } 
    catch (err) {
      throw err
    }; 
  };

  updateExpense = async (exp_id, expense) => {
    try {
      const updateExpense = await Expenses.update(expense, { where: {exp_id}});
      return {message: "Gasto actualizada correctamente"}
    }
    catch (err) {
      throw err
    }
  }; 
}; 