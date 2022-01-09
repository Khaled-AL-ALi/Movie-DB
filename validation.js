const joi = require('@hapi/joi');

const signupValidattion = data => {
    const schema = joi.object({
        email: joi.string().min(15).required().email(),
        password: joi.string().required().min(6),
    });
    const validation = schema.validate(data);
    return validation;
}

const loginValidattion = data => {
    const schema = joi.object({
        email: joi.string().min(15).required().email(),
        password: joi.string().required().min(6),
    });
    const validation = schema.validate(data);
    return validation;
}

module.exports.signupValidattion = signupValidattion;
module.exports.loginValidattion = loginValidattion;