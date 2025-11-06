
import { quizModel } from "../../../DataBase/models/quiz.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/appError.js";
import { deleteOne } from "../handlers/handlers.js";

const addQuiz= catchError(async(req,res,next)=>{
  const quiz = await quizModel.create(req.body); 
  res.status(201).json({ state: true, message: "success", data: quiz });
})

const allQuiz = catchError(async (req, res, next) => {
  const quiz = await quizModel.find();

  res.status(200).json({ state: true, message: "success", data: quiz });
});

const getQuizById = catchError(async (req, res, next) => {

  const quiz = await quizModel.findById(req.params.id);
  if(!quiz) return next(new AppError("quiz not found", 404));
  res.status(200).json({ state: true, message: "success", data: quiz });
});

const updateQuiz = catchError(async (req, res, next) => {
  console.log(req.params.id);
  
  const quiz = await quizModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(quiz);
  
  if (!quiz) return next(new AppError("quiz not found", 404));
  res.status(200).json({ state: true, message: "success", data: quiz });
});


const deleteQuiz= deleteOne(quizModel)

export{
    addQuiz,
    allQuiz,
    getQuizById,
    updateQuiz,
    deleteQuiz
}