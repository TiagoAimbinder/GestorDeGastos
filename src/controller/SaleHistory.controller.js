import { SaleHistoryService } from "../services/SaleHistory.service.js";


export class SaleHistoryController {

  constructor() {
    this.SaleHistorySrv = new SaleHistoryService();
  }

  create = async (req, res) => {
    const { usu_id, sal_name, sal_quantity, sal_type } = req.body;  
    try {

      const data = { usu_id, sal_name, sal_quantity, sal_type }; 
      await this.SaleHistorySrv.create(data);
      res.status(200).json({ message: 'Venta creada exitosamente.', success: true, code: ''});

    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al crear la venta.', success: false, code: err.code || ''}); 
    }
  }; 

  monthlySales = async (req, res) => {
    const { usu_id } = req.query;

    try {
      const result = await this.SaleHistorySrv.monthlySales(usu_id); 
      res.status(200).json({ message: 'Ventas mensuales obtenidas correctamente.', success: true, code: '', sales: result});
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al obtener las ventas mensuales.', success: false, code: err.code || ''}); 
    }
  }


  totals = async (req, res) => { 
    const { usu_id } = req.query;

    try {
      const result = await this.SaleHistorySrv.getTotals(usu_id);
      res.status(200).json({ message: 'Totales obtenidos exitosamente.', success: true, code: '', totals: result});
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al obtener los totales.', success: false, code: err.code || ''}); 
    }
  }
}
