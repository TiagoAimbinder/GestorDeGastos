import { QueryTypes } from "sequelize";
import { SaleHistory, sequelize } from "../config/db.js";



export class SaleHistoryService {

  createSale = async (usu_id, sal_name, sal_quantity, sal_amount) => {
    try {
      const sale = await SaleHistory.create({ 
        usu_id: usu_id, 
        sal_name: sal_name,
        sal_quantity: sal_quantity,
        sal_amount: sal_amount,
        sal_date: new Date(),
      });
      return sale; 
    } catch (err) {
      throw new Error(err); 
    }
  };

  getMonthlySales = async () => {
    try {
      const sales = await sequelize.query(`
        SELECT sal_id, sal_name, sal_date, sal_amount 
        FROM saleHistories
        WHERE sal_date >= DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1) 
        AND sal_date < DATEADD(MONTH, 1, DATEFROMPARTS(YEAR(GETDATE()), MONTH(GETDATE()), 1))      
        `, 
      {
        type: QueryTypes.SELECT,
      })
      console.log('SALES: ', sales);
      return sales; 
    } catch (err) {
      throw new Error(err)
    }
  }; 

}