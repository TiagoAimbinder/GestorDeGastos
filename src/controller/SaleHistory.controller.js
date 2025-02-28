import { QueryTypes } from "sequelize";
import { User, sequelize } from "../config/db.js";
import { SaleHistoryService } from "../services/SaleHistory.service.js";


export class SaleHistoryController {

  saleHistorySrv = new SaleHistoryService(); 

  createSale = async (req, res) => {
    const { usu_id, sal_name, sal_quantity, sal_type, sal_local } = req.body;  
    try {
      const user = await User.findOne({ where: { usu_id: usu_id } }); 
      if (!user) { return res.status(400).json({ message: 'No existe un usuario registrado con ese ID.' })}; 
      // if (user.dataValues.role_id !== 1) { return res.status(400).json({ message: 'No tienes permisos para realizar esta acción.' })};
      if (sal_quantity < 0) { return res.status(400).json({ message: 'El tipo de venta no puede ser negativo.' }); } 

      const result = await this.saleHistorySrv.createSale(usu_id, sal_name, sal_quantity, sal_type, sal_local); 
      res.status(200).json({ message: 'Venta creada exitosamente.', sale: result});
    } catch (err) {
      res.status(500).json({ message: 'Error del servidor: Error al crear la venta.', err: err})
    }
  };

  getMonthlySales = async (req, res) => {
    const { usu_id } = req.query; 
    // console.log(usu_id)
    try {
      const user = await User.findOne({ where: { usu_id: usu_id } });
      if (!user) { return res.status(400).json({ message: 'No existe un usuario registrado con ese ID.' })}; 
      const result = await this.saleHistorySrv.getMonthlySales(usu_id);
      res.status(200).json({ message: 'Ventas mensuales obtenidas exitosamente.', sales: result});
      
    } 
    catch (err) {
      res.status(500).json({ message: 'Error del servidor: Error al obtener las ventas mensuales.', err: err})
    }
  }; 

  getTotals = async (req, res) => {
    try {
        const { usu_id, local } = req.query;
        const user = await User.findOne({ where: { usu_id: usu_id } });
        if (!user) {
            return res.status(400).json({ message: 'No existe un usuario registrado con ese ID.' });
        }

        const localValue = local === undefined || local === 'null' ? null : parseInt(local);
        const result = await this.saleHistorySrv.getTotals(usu_id, localValue);
        res.status(200).json({ message: 'Totales obtenidos exitosamente.', totals: result.totals, sales: result.sales }); // Enviar totales y datos
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor: Error al obtener los totales.', err: err });
    }
}; 
}
