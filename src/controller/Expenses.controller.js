
import { ExpensesService } from '../services/Expenses.service.js';

export class ExpensesController {


  constructor() {
    this.ExpensesSrv = new ExpensesService();
  }

  /**
   * --- REFACTORIZED ---
   * - ✅ | Create expense
   * - ✅ | Get all expenses
   * - ✅ | Update expense
   * - ✅ | Delete expense
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


  update = async (req, res) => {
    const { exp_id, usu_id } = req.params; 
    const { exp_name, exp_amount, exp_percentVta, cat_id } = req.body; 
    const exp = { exp_name, exp_amount, exp_percentVta, cat_id };
    try {
      await this.ExpensesSrv.update(exp_id, usu_id, exp);
      res.status(200).json({ message: 'Gasto actualizado correctamente', success: true, code: ''})
    } catch (err) {
      res.status( err.statusCode || 500).json({ message: err.message || 'Error al actualizar el gasto', success: false, code: err.code || '' });
    }
  }

  delete = async (req, res) => {
    const { usu_id, exp_id } = req.params; 
    try {
      await this.ExpensesSrv.delete(usu_id, exp_id);
      res.status(200).json({ message: 'Gasto eliminado correctamente', success: true, code: '' });
    } catch (err) {
      res.status( err.statusCode || 500).json({ message: err.message || 'Error al eliminar el gasto', success: false, code: err.code || '' });
    }
  }
};
