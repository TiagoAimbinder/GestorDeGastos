import { CurrencyType } from "../config/db.js"

export class CurrencyController {


  getAllCurrencyTypes = async (req, res) => {

    const allCurrencyTypes = await CurrencyType.findAll(); 
    return res.json({currency: allCurrencyTypes});
  }

};