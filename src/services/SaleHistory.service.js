import { QueryTypes } from "sequelize";
import { SaleHistory, sequelize } from "../config/db.js";



export class SaleHistoryService {

  createSale = async (usu_id, sal_name, sal_quantity, sal_type) => {
    try {
      const sale = await SaleHistory.create({ 
        usu_id: usu_id, 
        sal_name: sal_name,
        sal_quantity: sal_quantity,
        sal_date: new Date(),
        sal_type: sal_type, 
      });
      return sale; 
    } catch (err) {
      throw new Error(err); 
    }
  };

  getMonthlySales = async () => {
    try {
      const sales = await sequelize.query(`
        SELECT sal_id, sal_name, sal_date 
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

  getTotals = async () => {
    try {
      const [[totalSales]] = await sequelize.query(`
        SELECT 
            SUM(CASE 
                    WHEN sal_type = 1 THEN sal_quantity
                    WHEN sal_type = 2 THEN -sal_quantity
                    ELSE 0
                END) AS total_general,

            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATEADD(DAY, 1-DAY(GETDATE()), CAST(GETDATE() AS DATE)) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATEADD(DAY, 1-DAY(GETDATE()), CAST(GETDATE() AS DATE)) THEN -sal_quantity
                    ELSE 0
                END) AS total_mensual,

            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATEADD(DAY, 1 - DATEPART(WEEKDAY, GETDATE()), GETDATE()) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATEADD(DAY, 1 - DATEPART(WEEKDAY, GETDATE()), GETDATE()) THEN -sal_quantity
                    ELSE 0
                END) AS total_semanal,

            SUM(CASE 
                    WHEN sal_type = 1 THEN sal_quantity
                    WHEN sal_type = 2 THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(DAY, MIN(sal_date), MAX(sal_date)) + 1, 0) AS promedio_diario_general,

            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATEADD(DAY, 1-DAY(GETDATE()), CAST(GETDATE() AS DATE)) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATEADD(DAY, 1-DAY(GETDATE()), CAST(GETDATE() AS DATE)) THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(DAY, DATEADD(DAY, 1-DAY(GETDATE()), CAST(GETDATE() AS DATE)), GETDATE()) + 1, 0) AS promedio_diario_mensual,

            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATEADD(DAY, 1 - DATEPART(WEEKDAY, GETDATE()), GETDATE()) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATEADD(DAY, 1 - DATEPART(WEEKDAY, GETDATE()), GETDATE()) THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(DAY, DATEADD(DAY, 1 - DATEPART(WEEKDAY, GETDATE()), GETDATE()), GETDATE()) + 1, 0) AS promedio_diario_semanal
        FROM saleHistories;
      `);
      return totalSales; 
    } catch (err) {
      throw new Error(err);      
    }
  }

}