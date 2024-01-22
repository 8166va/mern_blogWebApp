import mongoose from "mongoose";
const CommentSchema=mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 postId:{
    type:String,
    required:true
 },
 postComment:{
    type:String,
    required:true
 },
 commentDate:{
    type:String,
    required:true
 }
})
const comment=mongoose.model('comment',CommentSchema);
export default comment;