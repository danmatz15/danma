const mongoose = require("mongoose");
const Joi = require("joi");
const jwt =require("jsonwebtoken");
const {config} = require("../config/secret")


const userSchema = new mongoose.Schema({
  
  email:String,
  password:String,
  date_created:{
      type : Date , default : Date.now
  }
})
exports.UserModel = mongoose.model("users",userSchema);

exports.createToken = (_id) => {
  let token = jwt.sign({_id},config.tokenSecret,{expiresIn:"60mins"});
  return token;
}

exports.userValid = (_bodyValid) =>{
  let joiSchema = Joi.object({
   
      // email() -> בודק שגם האימייל לפי תבנית מייל
      email: Joi.string().min(4).max(100).email().required(),
      password: Joi.string().min(4).max(100).required(),
  })
  return joiSchema.validate(_bodyValid);
}

exports.loginValid = (_bodyValid) =>{
  let joiSchema = Joi.object({
      email: Joi.string().min(2).max(100).email().required(),
      password: Joi.string().min(5).max(100).required(),
  })
  return joiSchema.validate(_bodyValid);
}
