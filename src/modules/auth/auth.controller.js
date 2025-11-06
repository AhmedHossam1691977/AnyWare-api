import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { catchError } from "../../middleware/catchError.js"
import { AppError } from "../../utils/appError.js"
import { userModel } from "../../../DataBase/models/user.model.js"






// signup
const signup =catchError( async( req ,res,next )=>{    
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phoneNumber: req.body.phoneNumber,
    }
    
        let user =new userModel(userData)
        await user.save()
        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
        return res.json({message:"success",token})
    
})




// signin
const signin =catchError(async ( req ,res,next )=>{
    const user =await userModel.findOne({email:req.body.email})
    if(user  && bcrypt.compareSync(req.body.password ,user.password)){
        const token = jwt.sign({userId:user._id,role:user.role,userAddress:user.addresses},process.env.JWT_KEY)
        return res.json({message:"success" ,token,user:{userName:user.name,id:user._id,role:user.role,email:user.email}})
    }
    next(new AppError(`incorrect email or password`,401))
})


// changePassword
 const changePassword = catchError(async (req, res, next) => {
  const { password, newPassword, confirmNewPassword } = req.body;

  const user = await userModel.findById(req.user._id);
  if (!user) return next(new AppError("User not found", 404));


  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return next(new AppError("Incorrect current password", 401));

  
  if (newPassword !== confirmNewPassword)
    return next(new AppError("New passwords do not match", 400));


  const hashedPassword = bcrypt.hashSync(newPassword, 8);
  await userModel.findByIdAndUpdate(user._id, {
    password: hashedPassword,
    passwordChangedAt: Date.now(),
  });


  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_KEY,
    { expiresIn: "7d" } 
  );

  
  return res.status(200).json({
    message: "Password updated successfully",
    token,
  });
});


// Authentication
const protectedRoutes =catchError(async ( req ,res,next )=>{

    const {token} = req.headers

    if(!token) return next( new AppError("Please login first to access this route ",401))

    let decoded = jwt.verify(token , process.env.JWT_KEY)

    const user =await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('The User not found', 401))

    if(user.passwordChangedAt){
        let time = parseInt(user.passwordChangedAt.getTime()/1000)
        if(time > decoded.iat) return  next(new AppError('Token is expired , please log in again ',400));

    }
    req.user = user
    next()
})

// authorization for admin
const allowedTo=(...roles)=>{

    return catchError(async ( req ,res,next )=>{

    if(!roles.includes(req.user.role)) return next(new AppError('You are not allowed to perform this action on this resource' ,403))

    next(); 
    })
}






export{
    signup,
    signin,
    changePassword,
    protectedRoutes,
    allowedTo,
}


