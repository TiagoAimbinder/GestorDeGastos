import { QueryTypes } from "sequelize";
import { SaleHistory, sequelize } from "../config/db.js";



export class SaleHistoryService {

  createSale = async (usu_id, sal_name, sal_quantity, sal_type, sal_local) => {
    try {
      const sale = await SaleHistory.create({ 
        usu_id: usu_id, 
        sal_name: sal_name,
        sal_quantity: sal_quantity,
        sal_date: new Date(),
        sal_type: sal_type,
        sal_local: sal_local
      });
      return sale; 
    } catch (err) {
      throw new Error(err); 
    }
  };

  getMonthlySales = async () => {
    try {
      const sales = await sequelize.query(`
      SELECT sal_id, sal_name, sal_date, sal_quantity, sal_type, sal_local
      FROM saleHistories
      WHERE sal_date >= MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL (MONTH(CURDATE()) - 1) MONTH
      AND sal_date < MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL MONTH(CURDATE()) MONTH;
       
        `, 
      {
        type: QueryTypes.SELECT,
      })
      return sales; 
    } catch (err) {
      throw new Error(err)
    }
  }; 

  getTotals = async (usu_id, local) => {
    try {
        let localFilter = "";
        if (local !== null && local !== undefined) {
            localFilter = `AND sal_local = ${local}`;
        }

        // Obtener los totales
        const [[totalSales]] = await sequelize.query(`
            SELECT 
                SUM(CASE WHEN sal_type = 1 THEN sal_quantity WHEN sal_type = 2 THEN -sal_quantity ELSE 0 END) AS total_general,
                SUM(CASE WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN sal_quantity WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN -sal_quantity ELSE 0 END) AS total_mensual,
                SUM(CASE WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN sal_quantity WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN -sal_quantity ELSE 0 END) AS total_semanal,
                SUM(CASE WHEN sal_type = 1 THEN sal_quantity WHEN sal_type = 2 THEN -sal_quantity ELSE 0 END) / NULLIF(DATEDIFF(MAX(sal_date), MIN(sal_date)) + 1, 0) AS promedio_diario_general,
                SUM(CASE WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN sal_quantity WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN -sal_quantity ELSE 0 END) / NULLIF(DATEDIFF(CURDATE(), DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY)) + 0, 0) AS promedio_diario_mensual,
                SUM(CASE WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN sal_quantity WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN -sal_quantity ELSE 0 END) / NULLIF(DATEDIFF(CURDATE(), DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY)) + 1, 0) AS promedio_diario_semanal
            FROM saleHistories
            WHERE 1=1 ${localFilter};
        `);

        // Obtener los datos filtrados por mes
        const sales = await sequelize.query(`
            SELECT sal_id, sal_name, sal_date, sal_quantity, sal_type, sal_local
            FROM saleHistories
            WHERE MONTH(sal_date) = MONTH(CURDATE()) AND YEAR(sal_date) = YEAR(CURDATE()) ${localFilter};
        `, { type: QueryTypes.SELECT });

        return { totals: totalSales, sales: sales }; // Devolver tanto totales como datos
    } catch (err) {
        throw new Error(err);
    }
};

}