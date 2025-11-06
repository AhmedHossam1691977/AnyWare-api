import Joi from "joi";

 const addAnnouncementVal = Joi.object({
  title: Joi.string().min(3).max(150).required().messages({
    "string.empty": "Announcement title is required",
    "string.min": "Announcement title must be at least 3 characters long",
    "string.max": "Announcement title must be less than 150 characters",
    "any.required": "Announcement title is required",
  }),

  description: Joi.string().min(10).max(1000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must be less than 1000 characters",
    "any.required": "Description is required",
  }),

});


const paramsIdVal =Joi.object({
    id:Joi.string().hex().length(24).required(),
    
})
 const updateAnnouncementVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
  
  title: Joi.string().min(3).max(150).messages({
    "string.empty": "Announcement title is required",
    "string.min": "Announcement title must be at least 3 characters long",
    "string.max": "Announcement title must be less than 150 characters",
    "any.required": "Announcement title is required",
  }),

  description: Joi.string().min(10).max(1000).messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 10 characters long",
    "string.max": "Description must be less than 1000 characters",
    "any.required": "Description is required",
  }),

});

export {
    addAnnouncementVal,
    paramsIdVal,
updateAnnouncementVal
}
