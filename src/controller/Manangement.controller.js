import { ManangementService } from '../services/Manangement.service.js' 

export class ManangementController {

  constructor () {
    this.ManangementSrv = new ManangementService(); 
  }

  create = async (req, res) => {
    const { his_amount, his_description, his_type, usu_id, cur_id, his_date} = req.body;
    const movement = { his_amount, his_description, his_type, usu_id, cur_id, his_date };

    try {
      await this.ManangementSrv.create(movement);
      res.status(200).json({ message: 'Movimiento creado correctamente', success: true, code: ''})
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: 'Error al crear el movimiento', success: false, code: err.code || ''})
    }    
  }; 

  getAll = async (req, res) => {
    try {
      const movements = await this.ManangementSrv.getAll();
      res.status(200).json({ message: 'Movimientos obtenidos correctamente', success: true, code: '', manangement: movements })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: 'Error al obtener los movimientos', success: false, code: err.code || ''})
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      await this.ManangementSrv.delete(id);
      res.status(200).json({ message: 'Movimiento eliminado correctamente', success: true, code: '' })
    } catch (err) {
      res.status(err.statusCode || 500).json({ message: 'Error al eliminar el movimiento', success: false, code: err.code || ''})
    }
  };


  updateMovement = async (req, res) => {

    const { his_id, usu_id } = req.params; 
    const { his_amount, his_description, his_type, cur_id } = req.body; 

    const data = { his_id, usu_id, his_amount, his_description, his_type, cur_id } 
    try {
      await this.ManangementSrv.update(data);
      res.status(200).json({ message: 'Movimiento actualizado correctamente', success: true, code: ''})
    } 
    catch (err) {
      res.status(err.statusCode || 500).json({ message: err.message || 'Error al actualizar el movimiento', success: false, code: ''})
    }
  }
}; 