import Joi from "joi";

export class CategoryRequest {
  
  CreateCategorySchema = Joi.object({
    usu_id: Joi.number().required(),
    cat_name: Joi.string().required(),
    cat_color: Joi.string().required().allow(null),
  });

  UpdateCategorySchema = Joi.object({
    cat_name: Joi.string().required(),
    cat_color: Joi.string().required().allow(null),
  });

  paramsUpdateCategorySchema = Joi.object({
    cat_id: Joi.number().required(),
    usu_id: Joi.number().required(),
  });

  paramsGetAllSchema = Joi.object({
    usu_id: Joi.number().required(),
  });

  DeleteCategorySchema = Joi.object({
    cat_id: Joi.number().required(),
    usu_id: Joi.number().required(),
  });

  validateCreate = (req, res, next) => {
    const { error: bodyError } = this.CreateCategorySchema.validate(req.body);
    if (bodyError) {
        return res.status(400).json({ message: bodyError.details[0].message });
    }
    next();
  }

  validateUpdate = (req, res, next) => {
    const { error: paramsError } = this.paramsUpdateCategorySchema.validate(req.params);
    if (paramsError) {
        return res.status(400).json({ message: paramsError.details[0].message });
    }

    const { error: bodyError } = this.UpdateCategorySchema.validate(req.body);
    if (bodyError) {
        return res.status(400).json({ message: bodyError.details[0].message });
    }

    next();
  }

  validateGetAll = (req, res, next) => {
    const { error: paramsError } = this.paramsGetAllSchema.validate(req.params);
    if (paramsError) {
        return res.status(400).json({ message: paramsError.details[0].message });
    }
    next();
  }

  validateDelete = (req, res, next) => {
    const { error: paramsError } = this.DeleteCategorySchema.validate(req.params);
    if (paramsError) {
        return res.status(400).json({ message: paramsError.details[0].message });
    }
    next();
  }
}