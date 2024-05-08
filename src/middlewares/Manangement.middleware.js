import Joi from "joi";


export class ManangementRequest {
    
  createMovementSchema = Joi.object({
    his_amount: Joi.number().required(),
    his_description: Joi.string().required(),
    his_type: Joi.string().valid("ingreso", "egreso").required(),
    usu_id: Joi.number().required(),
    cur_id: Joi.number().required()
  });

  DeleteMovementSchema = Joi.object({
    id: Joi.number().required()
  });




}