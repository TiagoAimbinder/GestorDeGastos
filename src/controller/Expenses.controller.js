import { User, Category, Expenses } from '../config/db.js';

import { ExpensesService } from '../services/Expenses.service.js';

export class ExpensesController {

  createExpenses = async (req, res) => {
    const {usu_id, exp_name, exp_amount, exp_percentVta, cat_id } = req.body;
    
    try {
      const user = await User.findOne({ where: { usu_id: usu_id }});
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      const cat = await Category.findOne({ where: { cat_id: cat_id }});
      if (!cat) {
        return res.status(404).json({ message: 'Categoria no encontrada' });
      }; 

      if (user.dataValues.role_id !== 1) {
        return res.status(401).json({ message: 'No tiene permisos para crear gastos' });
      }

      const expensesService = new ExpensesService();
      const result = await expensesService.createExpenses({exp_name, exp_amount, exp_percentVta, cat_id});
      res.status(201).json(result);
    }
    catch (err) {
      res.status(500).json({ message: 'Error del servidor | createExpenses - Controller', error: err.message }); 
    } 
  }

  getAll = async (req, res) => {

    const { usu_id } = req.params; 
    
    try { 
      const user = await User.findByPk(usu_id);

      if (!user) {
        return res.status(404).json({message: "El usuario no existe"});
      } 

      if (user.dataValues.role_id !== 1) {
        res.status(401).json({message: "El usuario no tiene permisos para obtener las categorías."});
        return;
      };

      const expenses = await Expenses.findAll();
      res.status(200).json({message: "Gastos encontrados", expenses: expenses}  );
    }
    
    catch (err) {
      res.status(500).json({ message: 'Error del servidor | getAll - Controller', error: err.message });  
    }
  } 

  updateExpense = async (req, res) => {
    const { exp_id, usu_id } = req.params;
    const { exp_name, exp_amount, exp_percentVta, cat_id  } = req.body;

    try {

      const user = await User.findByPk(usu_id);
      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      if (user.dataValues.role_id !== 1) {
        res.status(401).json({message: "El usuario no tiene permisos para crear categorías."});
        return;
      };

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
  
      if (user.dataValues.role_id !== 1) {
        return res.status(401).json({message: "El usuario no tiene permisos para eliminar este gasto."});;
      };
  
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
