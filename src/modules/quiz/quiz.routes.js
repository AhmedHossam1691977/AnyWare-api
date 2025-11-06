import express from "express";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { limiter } from "../../middleware/rateLimit .js";
import { addQuiz, allQuiz, deleteQuiz, getQuizById, updateQuiz } from "./quiz.controller.js";
import { addQuizVal, paramsIdVal, updateQuizVal } from "./quiz.validation.js";
const quizRouter = express.Router();


quizRouter.route('/')
.post(protectedRoutes,allowedTo("admin"),validation(addQuizVal),limiter(50),addQuiz)
.get(allQuiz)

quizRouter.route('/:id')
.get(protectedRoutes,validation(paramsIdVal),limiter(),getQuizById)
.patch(protectedRoutes,allowedTo("admin"),validation(updateQuizVal),updateQuiz)
.delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),deleteQuiz)


export default quizRouter;