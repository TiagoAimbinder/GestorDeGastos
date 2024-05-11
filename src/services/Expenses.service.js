import { Expenses } from '../config/db.js'


export class ExpensesService {

  createExpenses = async (expense) => {
    try {
      const expenseCreated = await Expenses.create(expense);
      const result = {message: "Gasto creado correctamente", exp: expenseCreated}
      return result; 
    }
    catch (err) {
      throw err;
    }
  };

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