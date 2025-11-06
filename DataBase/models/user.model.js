import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        minLength: [1, 'too short first name']
    },
    lastName: {
        type: String,
        trim: true,
        minLength: [1, 'too short last name']
    },
    userName: {
        type: String,
        trim: true,
        minLength: [1, 'too short user name']
    },
    email: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    confirmEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'owner'],
        default: 'user',
        lowercase: true
    },
    passwordChangedAt: Date,
    
    addresses: {
        type: String,
    },
    passwordResetToken: String,
    resetCode: {
        type: String,
        default: undefined
    },
    passwordResetTokenExpire: Date,



}, { timestamps: true });

// Hash password
schema.pre('save',function(){
        if(this.password) this.password = bcrypt.hashSync(this.password,8)
        if(this.confirmPassword) this.confirmPassword = bcrypt.hashSync(this.confirmPassword,8)

})



schema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  if (!update.firstName && !update.lastName) return next();
  const user = await this.model.findOne(this.getQuery());
  const firstName = update.firstName || user.firstName;
  const lastName = update.lastName || user.lastName;

  update.userName = `${firstName} ${lastName}`.trim();

  next();
});


export const userModel = mongoose.model('user', schema);