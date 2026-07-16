const Joi = require('joi');

module.exports.projectValidation = Joi.object({
    project: Joi.object({
        title: Joi.string()
            .trim()
            .required(),
        description: Joi.string()
            .trim()
            .required()
    }).required()
})

module.exports.ticketValidation = Joi.object({
    ticket: Joi.object({
        title: Joi.string()
            .trim()
            .required(),
        description: Joi.string()
            .trim()
            .required(),
        status: Joi.string()
            .valid("Open", "In Progress", "Closed")
            .required(),
        priority: Joi.string()
            .valid("Low", "Medium", "High")
            .required()
    }).required()
})