import Joi from "joi";


export class SaleHistoryMiddleware {

  static CreateSchema = Joi.object({
    usu_id: Joi.number().positive().required(), 
    sal_name: Joi.string().required(), 
    sal_quantity: Joi.number().positive().required(), 
    sal_type: Joi.number().valid(1, 2),
    sal_local: Joi.number().required().valid(1, 2)
  });

  static UsuIdSchema = Joi.object({
    usu_id: Joi.number().positive().required(),
  });

  validateCreate = (req, res, next) => {
    const { error } = SaleHistoryMiddleware.CreateSchema.validate(req.body);
    if (error) { 
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  }

  ValidateUsuId(req, res, next) {
    const { usu_id } = req.query;
    if (!usu_id || isNaN(usu_id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }
    next();
  }
}; 