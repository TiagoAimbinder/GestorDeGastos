
import { ManangementHistory } from '../config/db.js'

export class ManangementService {

  createMovement = async (movement) => {
    try {
      const movementCreated = await ManangementHistory.Create({
        his_amount: movement.his_amount,
        his_description: movement.his_description,
        his_type: movement.his_type,
        usu_id: movement.usu_id,
        cur_id: movement.cur_id
      })
      const result = { message: "Movimiento creado correctamente", movement: movementCreated}
      return result;
    } 
    catch (err) {
      throw err; 
    }
  }
}