import Comment from "../model/comment.js";
import mongoose from 'mongoose';
export const saveComment=async(req,res)=>{
try{
    const comment=await new Comment(req.body);
    comment.save();
    return res.status(200).json('comment is successfully saved');
}
catch(err){
    return res.status(500).json({msg:err.message});
}
}
export const getComments=async(req,res)=>{
   const pid= req.params.id;
try{
    const comments=await Comment.find({postId:pid});
    return res.status(200).json(comments);
}
catch(err)
{
    return res.status(500).json({msg:err.message});
}
}
export const deleteComment=async(req,res)=>{
try{
    const o_id=new mongoose.Types.ObjectId(req.params.id);
    const CommentById=await Comment.findOne({ _id:o_id});
    if(!CommentById)
    {
      return res.status(404).json({msg:'comment not found'});
    }
    else{
   await Comment.deleteOne({ _id:o_id });
    return res.status(200).json({msg:'comment deleted successfully'});}
}catch(err){
    return res.status(500).json({msg:err.message});
}
}