import Joi from "joi";



const addUserVal = Joi.object({
  firstName: Joi.string().min(2).max(40).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  lastName: Joi.string().min(2).max(40).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  email: Joi.string()
  .pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud)\.com$/)
  .required()
  .messages({
    "string.pattern.base": "Email must be from a valid provider (e.g. Gmail, Yahoo, Outlook, Hotmail, iCloud)",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.pattern.base": "Password must be at least 6 characters (letters or numbers only)",
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
      "string.empty": "Phone number is required",
    }),
    role: Joi.string().required().messages({
      "string.empty": "Role is required",
    }),
});

const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})


const updateUserVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
  firstName: Joi.string().min(2).max(40).messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
  }),
  lastName: Joi.string().min(2).max(40).messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
  }),
  email: Joi.string()
  .pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud)\.com$/)
  
  .messages({
    "string.pattern.base": "Email must be from a valid provider (e.g. Gmail, Yahoo, Outlook, Hotmail, iCloud)",
    "string.empty": "Email is required",
  }),

  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    
    .messages({
      "string.pattern.base": "Password must be at least 6 characters (letters or numbers only)",
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.valid(Joi.ref("password"))
    
    .messages({
      "any.only": "Passwords do not match",
      "any.required": "Confirm password is required",
    }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
      "string.empty": "Phone number is required",
    }),
    role: Joi.string().messages({
      "string.empty": "Role is required",
    }),
});


export {
    addUserVal,
    paramsIdVal,
    updateUserVal
}
