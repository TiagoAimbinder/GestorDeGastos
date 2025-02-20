import { Database } from "../config/db.js";
import { encryptData } from '../config/utils.js'


export class UserRep {

    get models() { return Database.models }

    create = async (user, role_id, transaction = null) => {
        await this.models.User.create({
            usu_name: user.usu_name,
            usu_password: await encryptData(user.usu_password),
            usu_email: user.usu_email,
            role_id: role_id,
            usu_token: null, 
        }, { transaction });
    }

    findByID = async (usu_id, transaction = null) => {
        const user = await this.models.User.findOne({ where: {usu_id: usu_id}, transaction})
        return user ? user.dataValues : null
    }; 

    findByName = async (usu_name, transaction = null ) => {
        const user = await this.models.User.findOne({ where: where(fn('LOWER', col('usu_name')), usu_name.toLowerCase().trim()), transaction });
        return user ? user.dataValues : null; 
    }

    updateToken = async (usu_id, usu_token, transaction = null) => {
        await this.models.User.update({ usu_token }, { where: { usu_id }, transaction });
    }

    /**
     * On get all can pass the params: 
     * @param {Array} params (Params that we want)
     */
    getAll = async (params, transaction = null) => {
        const users = await this.models.User.findAll({
            attributes: params,  
        }, { transaction });
        return users.map(user => user.dataValues);
    }

}