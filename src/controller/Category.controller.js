import { User, Category } from '../config/db.js'
import { CategoryService } from '../services/Category.service.js';
import { where, fn, col } from 'sequelize';

export class CategoryController {

  createCategory = async (req, res) => {

    const { usu_id, cat_name, cat_color } = req.body; 

    try {
      const user = await User.findByPk(usu_id);
      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      // if (user.dataValues.role_id !== 1) {
      //   res.status(401).json({message: "El usuario no tiene permisos para crear categorías."});
      //   return;
      // };

      const categoryByName = await Category.findOne({
        where: where(fn('LOWER', col('cat_name')), cat_name.toLowerCase())
      });

      if (categoryByName) {
        return res.status(400).json({ message: 'La categoría ya existe' });
      }

      const finalColor = cat_color === null ? "#FFFFFF" : cat_color;
      
      const categoryService = new CategoryService()
      const result = await categoryService.createCategory(cat_name, finalColor);
      res.status(201).json(result);
    } 
    catch (err) {
      res.status(500).json({ message: 'Error del servidor | createCategory - Controller', error: err.message });
    }
  };

  updateCategory = async (req, res) => {
    const { cat_id, usu_id } = req.params;
    const { cat_name, cat_color } = req.body;

    try {

      const user = await User.findByPk(usu_id);
      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      // if (user.dataValues.role_id !== 1) {
      //   res.status(401).json({message: "El usuario no tiene permisos para crear categorías."});
      //   return;
      // };

      const category = Category.findByPk(cat_id);
      if (!category) {
        return res.status(404).json({ message: 'La categoría no existe' });
      }

      cat_color === null ? cat_color = category.dataValues.cat_color:null;
      const categoryService = new CategoryService()
      const result = await categoryService.updateCategory({cat_id, cat_name, cat_color});
      res.status(200).json(result);
      
    } catch (err) {
      res.status(500).json({ message: 'Error del servidor | updateCategory - Controller', error: err.message });
    }
  }

  getAllCategories = async (req, res) => {
    const { usu_id } = req.params
    try {
      const user = await User.findByPk(usu_id);

      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      // if (user.dataValues.role_id !== 1) {
      //   res.status(401).json({message: "El usuario no tiene permisos para obtener las categorías."});
      //   return;
      // };

      const categories = await Category.findAll();
      return res.status(200).json({message: "Categorias encontradas", categories: categories});

    } catch (err) {
      res.status(500).json({ message: 'Error del servidor | getAllCategories - Controller', error: err.message });
    }
  }

  deleteCategory = async (req, res) => {
    const { usu_id, cat_id } = req.params;

    try {
      const user = await User.findByPk(usu_id);

      if (!user) {
        return res.status(404).json({ message: 'El usuario no existe' });
      };

      // if (user.dataValues.role_id !== 1) {
      //   return res.status(401).json({message: "El usuario no tiene permisos para eliminar la categoría."});;
      // };

      const category = await Category.findByPk(cat_id);
      if (!category) {
        return res.status(404).json({ message: 'La categoría no existe' });
      }

      const categoryService = new CategoryService(); 
      const result = await categoryService.deleteCategory(cat_id);
      res.status(200).json(result); 

    } catch(err) {
      res.status(500).json({ message: 'Error del servidor | deleteCategory - Controller', error: err.message });
    }
  }
}; 