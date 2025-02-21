

import { ManangementRep } from '../repositories/Manangement.repository.js';



export class ManangementService {

  constructor() {
    this.ManangementRep = new ManangementRep();
  }

  create = async (movement) => {
    const { his_amount } = movement;
    try {
      if (!Number.isFinite(his_amount) || his_amount <= 0) throw { message: "Monto debe ser un número positivo", statusCode: 400 };
      await this.ManangementRep.create(movement)
    } catch (err) {
      throw err
    }
  };

  getAll = async () => {
    try {
      return movements = await this.ManangementRep.getAll();
    } catch (err) {
      throw err; 
    }
  }; 

  delete = async (his_id) => { 
    try {
      await this.ManangementRep.delete(his_id);
    } catch (err) {
      throw err; 
    }
  }


  update = async () => {
    try {
      
    } catch (err) {
      throw err; 
    }
  }
}