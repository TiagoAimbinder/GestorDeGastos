import { ManangementWeek, User } from "../config/db.js";
import { ManangementWeekService } from "../services/ManangementWeek.service.js";

  export class ManangementWeekController {

    createMovement = async (req, res) => {
      const { hw_amount, hw_description, hw_type, usu_id, cur_id, hw_date} = req.body;
  
      // Validacion para que hw_amount solo sea un número positivo mayor a 0
      if (typeof hw_amount !== 'number' || isNaN(hw_amount) || hw_amount <= 0) {
        return res.status(400).json({ message: "Monto debe ser numero positivo" });
      }
  
      const movement = { hw_amount, hw_description, hw_type, usu_id, cur_id, hw_date };
      try {
        const manangementWeekService = new ManangementWeekService();
        const result = await manangementWeekService.createMovement(movement);
        res.status(201).json(result)
      } 
      catch (err) {
        res.status(500).json({ message: "Error de servidor | createMovement", error: err });
      }
    }; 
  
    getAllMovements = async (req, res) => {
  
      try {
        // Consulta todos los movimientos de la base de datos
        const manangement = await ManangementWeek.findAll({ where: { hw_status: 1 } });
  
        res.status(200).json({manangement: manangement});
      } catch (error) {
  
        console.error('Error al obtener los movimientos:', error);
        res.status(500).json({ message: 'Error al obtener los movimientos', error });
      }
    };
  
    deleteMovement = async (req, res) => {
      const { id } = req.params;
      try {
        await ManangementWeek.update({ hw_status: false }, { where: { hw_id: id } });
  
        res.status(200).json({ message: "Movimiento eliminado correctamente" });
      } catch (error) {
        console.error("Error al eliminar movimiento:", error);
        res.status(500).json({ message: "Error al eliminar movimiento", error });
      }
    };
  
    updateMovement = async (req, res) => {
  
      const { hw_id, usu_id } = req.params; 
      const { hw_amount, hw_description, hw_type, cur_id } = req.body; 
  
      try {
  
        const toUpdate = {
          hw_amount: hw_amount,
          hw_description: hw_description,
          hw_type: hw_type,
          cur_id: cur_id
        }
  
        // Actualizar solo los datos que no son nulos:
        const updatedFields = {};
        const fieldsToUpdate = ['hw_amount', 'hw_description', 'hw_type', 'cur_id'];
        fieldsToUpdate.forEach(field => {
            if (toUpdate[field] !== null && toUpdate[field] !== undefined) {
                updatedFields[field] = toUpdate[field];
            }
        });
  
        // Si el objeto está vacio (no se enviaron datos) devuelvo un error
        if (Object.keys(updatedFields).length === 0) {
          return res.status(400).json({ message: 'No se proporcionaron datos para actualizar.' });
        }
  
        const hw = await ManangementWeek.findOne({where: {hw_id}}); 
        if (!hw) {
          return res.status(404).json({ message: 'El movimiento no existe.'});
        };
  
        // Comprobación de que el usuario que está modificando es el que creo el movimiento.
        if (Number(usu_id) !== hw.dataValues.usu_id) {
          return res.status(403).json({ message: 'No tiene permisos para actualizar este movimiento. Solo el creador del movimiento puede modificarlo.' });
        }
  
        const manangementWeekService = new ManangementWeekService();
        const result = await manangementWeekService.updateMovement(hw_id, updatedFields);
        res.status(201).json(result);  
      } 
      catch (err) {
        res.status(500).json({ message: "Error de servidor | updateMovement", error: err });
      }
    }

    goToGeneral = async (req,res) => {
        const { usu_id } = req.params;
        try {
            const user = await User.findByPk(usu_id);
            if (!user) {
                return res.status(404).json({ message: 'El usuario no existe' });
            }

            if (Number(usu_id) !== 5) {
                console.log(usu_id)
                return res.status(401).json({ message: 'No tiene permisos para realizar esta accion'});
            }
            const manangementWeekService = new ManangementWeekService();
            const result = await manangementWeekService.goToGeneral();
            res.status(200).json({ message: "Registros migrados al general" });

            
         } catch (error) {
             res.status(500).json({ message: "Error de servidor | goToGeneral", error: error});

         }
    }


  }; 