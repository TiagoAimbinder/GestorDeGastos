import { Database } from "../config/db.js";


export class CurrencyRep {

    get models() { return Database.models }

    getAll = async () => {
        const currencies = await this.models.CurrencyType.findAll();
        return currencies.map( cur => cur.dataValues );
    }
}