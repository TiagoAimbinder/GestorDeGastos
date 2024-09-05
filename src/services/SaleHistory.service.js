import { QueryTypes } from "sequelize";
import { SaleHistory, sequelize } from "../config/db.js";



export class SaleHistoryService {

  createSale = async (usu_id, sal_name, sal_quantity) => {
    try {
      const sale = await SaleHistory.create({ 
        usu_id: usu_id, 
        sal_name: sal_name,
        sal_quantity: sal_quantity,
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
      SELECT sal_id, sal_name, sal_date, sal_quantity
      FROM saleHistories
      WHERE sal_date >= DATE_FORMAT(NOW(), '%Y-%m-01')
      AND sal_date < DATE_ADD(DATE_FORMAT(NOW(), '%Y-%m-01'), INTERVAL 1 MONTH);
         
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