import { Database } from "../config/db.js"



export class LogHistoryRep {

    get models() { return Database.models }

    create = async(usu_id, transaction = null) => {
        return this.models.LogHistory.create({ usu_id }, { transaction })
    }
}