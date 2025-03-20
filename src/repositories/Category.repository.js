import { col, fn, where } from "sequelize";
import { Database } from "../config/db.js"


export class CategoryRep { 

    get models() { return Database.models }

    create = async (data, transaction = null) => {
        const { cat_name, cat_color } = data; 
        return await this.models.Category.create({ cat_name, cat_color }, { transaction })
    }

    update = async (cat, transaction) => {
        const { cat_id, cat_name, cat_color } = cat; 
        return await this.models.Category.update({ cat_name, cat_color }, { where: { cat_id }, transaction });
    }

    findByName = async (cat_name, transaction = null) => { 
        return await this.models.Category.findOne({ where: where(fn('LOWER', col('cat_name')), cat_name.toLowerCase().trim()), transaction });
    }

    findByID = async (cat_id, transaction = null) => {
        const category = await this.models.Category.findOne({ where: { cat_id }, transaction }); 
        return category ? category.dataValues : null; 
    }

    getAll = async (transaction = null) => {
        const categories = await this.models.Category.findAll({transaction});
        return categories.map(category => category.dataValues);
    }

    delete = async (cat_id, transaction = null) => {
        return await this.models.Category.destroy({ where: { cat_id: cat_id }, transaction });
    }

}