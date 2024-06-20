import Joi from "joi";

export class ManangementWeekRequest {
  
  createMovementSchema = Joi.object({
    hw_amount: Joi.number().required(),
    hw_date: Joi.date().required(),
    hw_description: Joi.string().required(),
    hw_type: Joi.string().valid("Ingreso", "Egreso").required(),
    usu_id: Joi.number().required(),
    cur_id: Joi.number().required(),
  });

  DeleteMovementSchema = Joi.object({
    id: Joi.number().required()
  });

  GetAllMovementSchema= Joi.object({
    usu_id: Joi.number().optional(),
  })

  paramsUpdateSchema = Joi.object({
    usu_id: Joi.number().integer().required(),
    hw_id: Joi.number().integer().required()
  });

  UpdateSchema = Joi.object({
    hw_amount: Joi.number().optional(),
    hw_description: Joi.string().optional(),
    hw_type: Joi.string().optional(),
    cur_id: Joi.number().optional()
  }).or('hw_amount', 'hw_description', 'hw_type', 'cur_id');

  goToGeneralSchema = Joi.object({
    usu_id: Joi.number().required(),
  });

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