
import { ExpensesService } from '../services/Expenses.service.js';

export class ExpensesController {


  constructor() {
    this.ExpensesSrv = new ExpensesService();
  }

  /**
   * --- REFACTORIZED ---
   * - ✅ | Create expense
   * - ✅ | Get all expenses
   * -  | Update expense
   * -  | Delete expense
   */


  create = async (req, res) => {
    const { usu_id, exp_name, exp_amount, exp_percentVta, cat_id } = req.body;
    const data = { usu_id, exp_name, exp_amount, exp_percentVta, cat_id }
    try {
      await this.ExpensesSrv.create(data);
      res.status(201).json({ message: 'Gasto creado correctamente', success: true, code: '' })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al crear el gasto', success: false, code: err.code || ''})
    }
  }


  getAll = async (req, res) => {
    const { usu_id } = req.params;
    try {
      const expenses = await this.ExpensesSrv.getAll(usu_id);
      res.status(201).json({ message: 'Gastos obtenidos correctamente', success: true, code: '', expenses: expenses })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al obtener los gastos', success: false, code: err.code || ''})
    }
  }



  updateExpense = async (req, res) => {
    const { exp_id, usu_id } = req.params;
    const { exp_name, exp_amount, exp_percentVta, cat_id } = req.body;

    try {

      const user = await User.findByPk(usu_id);
      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      // if (user.dataValues.role_id !== 1) {
      //   res.status(401).json({message: "El usuario no tiene permisos para crear categorías."});
      //   return;
      // };

      const category = await Category.findByPk(cat_id);
      if (!category) {
        return res.status(404).json({ message: 'La categoría no existe.' });
      };

      const expense = Expenses.findByPk(exp_id);
      if (!expense) {
        return res.status(404).json({ message: 'El gasto no existe.' });
      }

      const expensesService = new ExpensesService()
      const result = await expensesService.updateExpense(exp_id, {exp_name, exp_amount, exp_percentVta, cat_id });
      res.status(200).json(result);

    } catch (err) {
      res.status(500).json({ message: 'Error del servidor | updateCategory - Controller', error: err.message });
    }

  }; 

  deleteExpense = async (req, res) => {
    const { usu_id, exp_id } = req.params; 

    try {
      const user = await User.findByPk(usu_id);

      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };
  
      // if (user.dataValues.role_id !== 1) {
      //   return res.status(401).json({message: "El usuario no tiene permisos para eliminar este gasto."});;
      // };
  
      const expense = await Expenses.findByPk(exp_id);
      if (!expense) {
        return res.status(404).json({ message: 'El gasto no existe' });
      }

      const expenseService = new ExpensesService();
      const result = await expenseService.deleteExpense(exp_id);
      res.status(200).json({result}); 

    } catch (err) {
      res.status(500).json({ message: 'Error del servidor | deleteExpense - Controller', error: err.message });
    }
  }; 
};
