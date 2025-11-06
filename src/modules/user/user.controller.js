import { isBlock } from "typescript";
import { userModel } from "../../../DataBase/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";

const addUser= catchError(async(req,res,next)=>{
  req.body.userName = req.body.firstName + req.body.lastName
  const user = await userModel.create(req.body); 
  res.status(201).json({ state: true, message: "success", data: user });
})

const allUser = catchError(async (req, res, next) => {
  const users = await userModel.find();

  const userData = users.map((user) => ({
    id: user._id,
    userName: user.userName,
    role: user.role,
  }));

  res.status(200).json({ state: true, message: "success", data: userData });
});

const getUserById = catchError(async (req, res, next) => {

  const user = await userModel.findById(req.params.id);

  const userData = {
    id: user._id,
    userName: user.userName,
    phone: user.phoneNumber,
    role: user.role,
    isBlock:user.isBlock,
    isActive:user.isActive
  }

  res.status(200).json({ state: true, message: "success", data: userData });
});

const updateUser = catchError(async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) return next(new AppError("User not found", 404));
  const userData={
    id:user._id,
    userName:user.userName,
    phone:user.phoneNumber,
    role:user.role
  }
  res.status(200).json({ state: true, message: "success", data: userData });
});


const deleteUser= deleteOne(userModel)

export{
    addUser,
    allUser,
    getUserById,
    updateUser,
    deleteUser
}