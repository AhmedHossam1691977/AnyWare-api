import express from "express";
import { addUser, allUser, deleteUser, getUserById, updateUser } from "./user.controller.js";
import { chickEmail } from "../../middleware/emailExist.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addUserVal, paramsIdVal, updateUserVal } from "./user.validation.js";
import { limiter } from "../../middleware/rateLimit .js";
const userRouter = express.Router();


userRouter.route('/')
.post(protectedRoutes,allowedTo("admin"),validation(addUserVal),chickEmail,limiter(50),addUser)
.get(protectedRoutes,allowedTo("admin"),limiter(),allUser)

userRouter.route('/:id')
.get(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),limiter(),getUserById)
.patch(protectedRoutes,allowedTo("admin"),validation(updateUserVal),limiter(),updateUser)
.delete(protectedRoutes,allowedTo("admin"),validation(paramsIdVal),limiter(),deleteUser)


export default userRouter;