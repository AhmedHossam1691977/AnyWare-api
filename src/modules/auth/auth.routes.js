import express from "express"
import {   changePassword, protectedRoutes, signin, signup } from "./auth.controller.js"
import { validation } from "../../middleware/validation.js"
import { chickEmail } from "../../middleware/emailExist.js"
import { changePasswordSchemaVal, signinSchemaVal, signupSchemaVal } from "./auth.validation.js"
import { limiter } from "../../middleware/rateLimit .js"




const authRouter = express.Router()

authRouter.post('/signup',validation(signupSchemaVal),chickEmail,limiter(5),signup)
authRouter.post('/signin',validation(signinSchemaVal),limiter(3,.50),signin)
authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordSchemaVal),limiter(1,1),changePassword)




export default authRouter