import { Database } from "../config/db.js";


export class SaleHistoryRep {

    constructor() {

    }; 

    get models() { return Database.models }
    get sequelize() { return Database.sequelize }

    create = async (data, transaction = null) => {
        return await this.models.SaleHistory.create({
            usu_id: data.usu_id,
            sal_name: data.sal_name,
            sal_quantity: data.sal_quantity,
            sal_date: new Date(),
            sal_type: data.sal_type,
        }, { transaction });
    };

    monthlySales = async () => {
        return await this.sequelize.query(`
            SELECT sal_id, sal_name, sal_date, sal_quantity, sal_type
            FROM saleHistories
            WHERE sal_date >= MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL (MONTH(CURDATE()) - 1) MONTH
            AND sal_date < MAKEDATE(YEAR(CURDATE()), 1) + INTERVAL MONTH(CURDATE()) MONTH;
            `, 
            { type: QueryTypes.SELECT },
        );
    }

    totals = async () => {
        let totalSales = []; 
        return [[totalSales]] = await this.sequelize.query(`
            SELECT 
            SUM(CASE 
                    WHEN sal_type = 1 THEN sal_quantity
                    WHEN sal_type = 2 THEN -sal_quantity
                    ELSE 0
                END) AS total_general,
        
            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN -sal_quantity
                    ELSE 0
                END) AS total_mensual,
        
            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN -sal_quantity
                    ELSE 0
                END) AS total_semanal,
        
            SUM(CASE 
                    WHEN sal_type = 1 THEN sal_quantity
                    WHEN sal_type = 2 THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(MAX(sal_date), MIN(sal_date)) + 1, 0) AS promedio_diario_general,
        
            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY) THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(CURDATE(), DATE_SUB(CURDATE(), INTERVAL DAYOFMONTH(CURDATE()) - 1 DAY)) + 0, 0) AS promedio_diario_mensual,
        
            SUM(CASE 
                    WHEN sal_type = 1 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN sal_quantity
                    WHEN sal_type = 2 AND sal_date >= DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY) THEN -sal_quantity
                    ELSE 0
                END) / NULLIF(DATEDIFF(CURDATE(), DATE_SUB(CURDATE(), INTERVAL (WEEKDAY(CURDATE()) + 4) % 7 DAY)) + 1, 0) AS promedio_diario_semanal
        FROM saleHistories;
        `);
    }; 
}