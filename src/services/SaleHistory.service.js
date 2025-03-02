import { UserRep } from "../repositories/User.repository.js";
import { SaleHistoryRep } from "../repositories/SaleHistory.repository.js";
import { Database } from "../config/db.js";


export class SaleHistoryService {

  constructor() {
    this.SaleHistoryRep = new SaleHistoryRep();
    this.UserRep = new UserRep();
  }; 

  get sequelize() { return Database.sequelize };

  create = async (data) => {
    const { usu_id, sal_quantity } = data;
    const transaction = await this.sequelize.transaction();

    try {
      const user = await this.UserRep.findByID(usu_id, transaction)
      if (!user) throw { message: 'No existe un usuario registrado con ese ID.', statusCode: 400, code: '' };
      if (user.role_id !== 1) throw { message: 'No tienes permisos para realizar esta acción.', statusCode: 400, code: '' };
      if (sal_quantity < 0) throw { message: 'El tipo de venta no puede ser negativo.', statusCode: 400, code: '' }; 

      await this.SaleHistoryRep.create(data, transaction);
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err; 
    }
  }

  monthlySales = async (usu_id) => {
    try {
      const user = await this.UserRep.findByID(usu_id);
      if (!user) throw { message: 'No existe un usuario registrado con ese ID.', statusCode: 400, code: '' };
      return await this.SaleHistoryRep.monthlySales();
    } catch (err) {
      throw err;       
    }
  }

  getTotals = async (usu_id) => {
    try {
      const user = await this.UserRep.findByID(usu_id)
      if (!user) throw { message: 'No existe un usuario registrado con ese ID.', statusCode: 400, code: '' };
      return await this.SaleHistoryRep.totals();
    } catch (err) {
      throw err;       
    }
  }
}


