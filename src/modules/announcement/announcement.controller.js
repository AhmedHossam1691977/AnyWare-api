
import { announcementModel } from "../../../DataBase/models/announcement.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";

const addAnnouncement= catchError(async(req,res,next)=>{
  req.body.createdBy = req.user.id
  const quiz = await announcementModel.create(req.body); 
  res.status(201).json({ state: true, message: "success", data: quiz });
})

const allAnnouncement = catchError(async (req, res, next) => {
  const quiz = await announcementModel.find().populate("createdBy", "userName  email role");
  res.status(200).json({ state: true, message: "success", data: quiz });
});

const getAllAnnouncementById = catchError(async (req, res, next) => {

  const quiz = await announcementModel.findById(req.params.id).populate("createdBy", "userName  email role");;
  if(!quiz) return next(new AppError("quiz not found", 404));
  res.status(200).json({ state: true, message: "success", data: quiz });
});

const updateAllAnnouncement = catchError(async (req, res, next) => {
  console.log(req.params.id);
  
  const quiz = await announcementModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(quiz);
  
  if (!quiz) return next(new AppError("quiz not found", 404));
  res.status(200).json({ state: true, message: "success", data: quiz });
});


const deleteAllAnnouncement= deleteOne(announcementModel)

export{
    addAnnouncement,
    allAnnouncement,
    getAllAnnouncementById,
    updateAllAnnouncement,
    deleteAllAnnouncement
}