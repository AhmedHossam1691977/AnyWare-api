import Joi from "joi";



 const addQuizVal = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    "string.empty": "Quiz title is required",
    "string.min": "Quiz title must be at least 3 characters long",
    "string.max": "Quiz title must be less than 100 characters",
  }),

  subject: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 2 characters long",
    "string.max": "Subject must be less than 50 characters",
  }),

  totalMarks: Joi.number().min(1).required().messages({
    "number.base": "Total marks must be a number",
    "number.min": "Total marks must be greater than 0",
    "any.required": "Total marks are required",
  }),

  dueDate: Joi.date().greater("now").required().messages({
    "date.base": "Due date must be a valid date",
    "date.greater": "Due date must be in the future",
    "any.required": "Due date is required",
  }),
});

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})

 const updateQuizVal = Joi.object({
    id:Joi.string().hex().length(24).required(),

  title: Joi.string().min(3).max(100).messages({
    "string.empty": "Quiz title is required",
    "string.min": "Quiz title must be at least 3 characters long",
    "string.max": "Quiz title must be less than 100 characters",
  }),

  subject: Joi.string().min(2).max(50).messages({
    "string.empty": "Subject is required",
    "string.min": "Subject must be at least 2 characters long",
    "string.max": "Subject must be less than 50 characters",
  }),

  totalMarks: Joi.number().min(1).messages({
    "number.base": "Total marks must be a number",
    "number.min": "Total marks must be greater than 0",
    "any.required": "Total marks are required",
  }),

  dueDate: Joi.date().greater("now").messages({
    "date.base": "Due date must be a valid date",
    "date.greater": "Due date must be in the future",
    "any.required": "Due date is required",
  }),
});

export {
    addQuizVal,
    paramsIdVal,
updateQuizVal
}
