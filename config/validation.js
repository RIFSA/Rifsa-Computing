import Joi from "@hapi/joi"

export const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        rePassword: Joi.string().min(6).required()
    })

    return schema.validate(data)
}

export const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    })

    return schema.validate(data)
}