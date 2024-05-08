import { Category } from '../config/db.js'


export class CategoryService {

  createCategory = async (cat_name) =>  {
    try {
      const createdCategory = await Category.create({ cat_name });
      return {message: "Categoría creada correctamente", category: createdCategory}
    }
    catch (err) {
      throw err; 
    }
  }; 

  updateCategory = async (cat) => {
    try {
      const updateCategory = await Category.update({cat_name: cat.cat_name},{ where: {cat_id: cat.cat_id}});
      return {message: "Categoría actualizada correctamente"}
    }
    catch (err) {
      throw err
    }
  };

  deleteCategory = async (cat_id) => {
    try {
      const deleteCategory = await Category.destroy({ where: { cat_id: cat_id }});
      return {message: "Categoría eliminada correctamente"}
    } 
    catch (err) {
      throw err
    }
  }
}; 