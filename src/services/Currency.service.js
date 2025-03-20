import { CurrencyRep } from "../repositories/Currency.repository.js";




export class CurrencySrv {

    constructor() {
        this.CurrencyRep = new CurrencyRep();
    }

    getAll = async () => { 
        try {
            const currencies = await this.CurrencyRep.getAll(); 
            if (!currencies) throw { message: 'No existen tipos de moneda', statusCode: 404, code: '' }
            return currencies; 
        } catch (err) {
            throw err;             
        }
    }

}