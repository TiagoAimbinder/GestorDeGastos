import { ManangementHistory } from '../config/db.js';
import { ManangementService } from '../services/Manangement.service.js' 

export class ManangementController {

  createMovement = async (req, res) => {
    const { his_amount, his_description, his_type, usu_id, cur_id, his_date} = req.body;

    // Validacion para que his_amount solo sea un número positivo mayor a 0
    if (typeof his_amount !== 'number' || isNaN(his_amount) || his_amount <= 0) {
      return res.status(400).json({ message: "Monto debe ser numero positivo" });
    }

    const movement = { his_amount, his_description, his_type, usu_id, cur_id, his_date };
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
      const manangement = await ManangementHistory.findAll({ where: { his_status: 1 } });

      res.status(200).json({manangement: manangement});
    } catch (error) {

      console.error('Error al obtener los movimientos:', error);
      res.status(500).json({ message: 'Error al obtener los movimientos', error });
    }
  };

  deleteMovement = async (req, res) => {
    const { id } = req.params;
    try {
      await ManangementHistory.update({ his_status: false }, { where: { his_id: id } });

      res.status(200).json({ message: "Movimiento eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar movimiento:", error);
      res.status(500).json({ message: "Error al eliminar movimiento", error });
    }
  };

  updateMovement = async (req, res) => {

    const { his_id, usu_id } = req.params; 
    const { his_amount, his_description, his_type, cur_id } = req.body; 

    try {

      const toUpdate = {
        his_amount: his_amount,
        his_description: his_description,
        his_type: his_type,
        cur_id: cur_id
      }

      // Actualizar solo los datos que no son nulos:
      const updatedFields = {};
      const fieldsToUpdate = ['his_amount', 'his_description', 'his_type', 'cur_id'];
      fieldsToUpdate.forEach(field => {
          if (toUpdate[field] !== null && toUpdate[field] !== undefined) {
              updatedFields[field] = toUpdate[field];
          }
      });

      // Si el objeto está vacio (no se enviaron datos) devuelvo un error
      if (Object.keys(updatedFields).length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
      }

      const his = await ManangementHistory.findOne({where: {his_id}}); 
      if (!his) {
        return res.status(404).json({ message: 'El movimiento no existe.'});
      };

      // Comprobación de que el usuario que está modificando es el que creo el movimiento.
      if (Number(usu_id) !== his.dataValues.usu_id) {
        return res.status(403).json({ message: 'No tiene permisos para actualizar este movimiento. Solo el creador del movimiento puede modificarlo.' });
      }

      const manangementService = new ManangementService();
      const result = await manangementService.updateMovement(his_id, updatedFields);
      res.status(201).json(result);  
    } 
    catch (err) {
      res.status(500).json({ message: "Error de servidor | updateMovement", error: err });
    }
  }
}; 