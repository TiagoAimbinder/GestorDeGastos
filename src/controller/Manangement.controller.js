import { ManangementService } from '../services/Manangement.service.js' 

export class ManangementController {

  createMovement = async (req, res) => {
    const { his_amount, his_description, his_type, usu_id, cur_id } = req.body;
    const movement = { his_amount, his_description, his_type, usu_id, cur_id };
    try {
      const manangementService = new ManangementService();
      const result = await manangementService.createMovement(movement);
      res.status(201).json(result)
    } 
    catch (err) {
      res.status(500).json({ message: "Error de servidor | createMovement", error: err });
    }
  }; 


}; 