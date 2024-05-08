import { ManangementHistory } from '../config/db.js';
import { ManangementService } from '../services/Manangement.service.js' 

export class ManangementController {

  createMovement = async (req, res) => {
    const { his_amount, his_description, his_type, usu_id, cur_id, estado } = req.body;
    //Validacion para que his_amount solo sea un numpero positivo mayor a 0
    if (typeof his_amount !== 'number' || isNaN(his_amount) || his_amount <= 0) {
      return res.status(400).json({ message: "Monto debe ser numero positivo" });
    }

    const movement = { his_amount, his_description, his_type, usu_id, cur_id, estado };
    try {
      const manangementService = new ManangementService();
      const result = await manangementService.createMovement(movement);
      res.status(201).json(result)
    } 
    catch (err) {
      res.status(500).json({ message: "Error de servidor | createMovement", error: err });
    }
  }; 

  getAllMovements = async (req, res) => {
    try {
      // Consulta todos los movimientos de la base de datos
      const movements = await ManangementHistory.findAll({ where: { estado: 1 } });

      res.status(200).json(movements);
    } catch (error) {

      console.error('Error al obtener los movimientos:', error);
      res.status(500).json({ message: 'Error al obtener los movimientos', error });
    }
  };

    deleteMovement = async (req, res) => {
    const { id } = req.params;
    try {
      await ManangementHistory.update({ estado: false }, { where: { his_id: id } });

      res.status(200).json({ message: "Movimiento eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar movimiento:", error);
      res.status(500).json({ message: "Error al eliminar movimiento", error });
    }
  };

  updateMovement = async (req, res) => {
    const { id } = req.params;
    const { his_amount, his_description, his_type } = req.body;
    try {
      const movement = await ManangementHistory.findByPk(id);
      if (!movement) {
        return res.status(404).json({ message: 'Movimiento no encontrado' });
      }

      movement.his_amount = his_amount;
      movement.his_description = his_description;
      movement.his_type = his_type;

      await movement.save(); //guardar cambios

      return res.status(200).json({ message: "Movimiento actualizado correctamente", movement });
    } catch (error) {
      console.error("Error al actualizar movimiento:", error);
      return res.status(500).json({ message: "Error al actualizar movimiento", error });
    }
  };
}; 