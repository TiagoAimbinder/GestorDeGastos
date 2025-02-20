import { Database } from "../config/db.js";


export class ExpenseRep {

    get models() { return Database.models }

    create = async (expense, cat_id, transaction = null) => {
        await this.models.Expenses.create({
            exp_name: expense.exp_name,
            exp_amount: expense.exp_amount,
            exp_percentVta: expense.exp_percentVta,
            cat_id: cat_id, 
        }, { transaction })
    }

    getAll = async (transaction = null) => {
        const expenses = await this.models.Expenses.findAll({transaction})
        return expenses.map(expense => expense.dataValues)
    }

}