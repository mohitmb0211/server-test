const Joi = require('joi');

module.exports.validateUserProfile = payload => {
  const schema = Joi.object().keys({
    productname: Joi.string().required(), 
    category: Joi.string().required(),
    modelno: Joi.string().required(),
  });

  let validationResults = schema.validate(payload, { stripUnknown: true, abortEarly: true });
  return validationResults;
};
