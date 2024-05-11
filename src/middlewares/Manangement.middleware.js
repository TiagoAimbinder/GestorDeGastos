import Joi from "joi";
import { getToken } from "../config/utils.js";

export class ManangementRequest {


  paramsUpdateSchema = Joi.object({
    usu_id: Joi.number().integer().required(),
    his_id: Joi.number().integer().required()
  });

  UpdateSchema = Joi.object({
    his_amount: Joi.number().optional(),
    his_description: Joi.string().optional(),
    his_type: Joi.string().optional(),
    cur_id: Joi.number().optional()
  }).or('his_amount', 'his_description', 'his_type', 'cur_id');

  validateUpdate = (req, res, next) => {
    const { error: paramsError } = this.paramsUpdateSchema.validate(req.params);
    if (paramsError) {
        return res.status(400).json({ message: paramsError.details[0].message });
    }

    const { error: bodyError } = this.UpdateSchema.validate(req.body);
    if (bodyError) {
        return res.status(400).json({ message: bodyError.details[0].message });
    }

    next();
  }
}