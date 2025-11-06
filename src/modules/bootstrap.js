import announcementRouter from "./announcement/announcement.routes.js"
import authRouter from "./auth/auth.routes.js"
import quizRouter from "./quiz/quiz.routes.js"
import userRouter from "./user/user.routes.js"

 const bootstrap = (app)=>{
app.use("/api/v1/user",userRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/quiz",quizRouter)
app.use("/api/v1/announcement",announcementRouter)

}

export default bootstrap