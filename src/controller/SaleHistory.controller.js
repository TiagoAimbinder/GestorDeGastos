import { SaleHistoryService } from "../services/SaleHistory.service.js";


export class SaleHistoryController {

  constructor() {
    this.SaleHistorySrv = new SaleHistoryService();
  }

  create = async (req, res) => {
    const { usu_id, sal_name, sal_quantity, sal_type, sal_local } = req.body;  
    try {

      const data = { usu_id, sal_name, sal_quantity, sal_type, sal_local }; 
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
    try {
      const { usu_id, sal_local } = req.query; // Obtener usu_id de los parámetros de la consulta

      if (!usu_id || isNaN(usu_id)) {
        return res.status(400).json({ success: false, message: 'Invalid user ID' });
      }

      const salLocalValue = (sal_local === 'null' || sal_local === null) ? null : sal_local;

      // Lógica para obtener los totales
      const totals = await this.SaleHistorySrv.getTotals(usu_id, salLocalValue);
      
      if (!totals) {
        return res.status(404).json({ success: false, message: 'No totals found' });
      }

      res.status(200).json({ success: true, totals });
    } catch (error) {
      console.error('Error in totals:', error);  // Aquí puedes obtener más detalles del error
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }
}
