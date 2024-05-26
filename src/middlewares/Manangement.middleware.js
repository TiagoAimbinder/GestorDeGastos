import Joi from "joi";

export class ManangementRequest {
  
  createMovementSchema = Joi.object({
    his_amount: Joi.number().required(),
    his_date: Joi.date().required(),
    his_description: Joi.string().required(),
    his_type: Joi.string().valid("Ingreso", "Egreso").required(),
    usu_id: Joi.number().required(),
    cur_id: Joi.number().required(),
  });

  DeleteMovementSchema = Joi.object({
    id: Joi.number().required()
  });

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
  validateCreate = (req, res, next) => {
    const { error } = this.createMovementSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };

  validateDelete = (req, res, next) => {
    const { error } = this.DeleteMovementSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ message: paramsError.details[0].message });
    }
    next(); 
  }

}