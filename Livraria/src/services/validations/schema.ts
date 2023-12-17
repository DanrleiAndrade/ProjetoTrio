import joi from "joi";

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).required()
})

const book = joi.object({
    name: joi.string().min(1).required(),
    description: joi.string().min(10).required(),
    price: joi.number().integer().required(),
    author: joi.string().min(3).required(),
    categories: joi.array().items(joi.number().required()).min(1).required()
})

export = { user, book }