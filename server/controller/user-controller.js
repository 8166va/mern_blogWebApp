import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../model/user.js";
import Token from "../model/token.js";
dotenv.config();

export const signupUser=async (request,response)=>{
try{
// const salt=await bcrypt.genSalt();
const hashedPassword=await bcrypt.hash(request.body.password,10);
const user={userName:request.body.userName,name:request.body.name,password:hashedPassword};
   const newUser=new User(user);
   await newUser.save();
   return response.status(200).json({msg:'signup successful'});
}catch(err){
   console.log(err);
return response.status(500).json({msg:'error while signup'});
}
}


export const loginUser=async(request,response)=>{
let user=await User.findOne({userName:request.body.userName});
if(!user){
  return response.status(400).json({msg:'user doesnt found'});
}
try{
let match=await bcrypt.compare(request.body.password,user.password);
if(match){
   //accessToken(contain secret key and body) expire after 15 min 
const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{ expiresIn:'15m'});
//refresh token is permanent
const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);
const newToken=new Token({token:refreshToken});
await newToken.save();
 response.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,userName:user.userName});
}else{
    response.status(400).json({msg:'password doesn"t match'});
}
}catch(err){
   console.log(err);
  response.status(500).json({msg:`error while logging`});
}
}