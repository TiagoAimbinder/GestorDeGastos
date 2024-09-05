import { QueryTypes } from "sequelize";
import { User, sequelize } from "../config/db.js";
import { SaleHistoryService } from "../services/SaleHistory.service.js";


export class SaleHistoryController {

  saleHistorySrv = new SaleHistoryService(); 

  createSale = async (req, res) => {
    const { usu_id, sal_name, sal_quantity } = req.body;  
    try {
      const user = await User.findOne({ where: { usu_id: usu_id } }); 
      if (!user) { return res.status(400).json({ message: 'No existe un usuario registrado con ese ID.' })}; 

      const result = await this.saleHistorySrv.createSale(usu_id, sal_name, sal_quantity); 
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
      const result = await this.saleHistorySrv.getMonthlySales();
      res.status(200).json({ message: 'Ventas mensuales obtenidas exitosamente.', sales: result});
      
    } 
    catch (err) {
      res.status(500).json({ message: 'Error del servidor: Error al obtener las ventas mensuales.', err: err})
    }
  }; 
}
