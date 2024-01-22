import Post from '../model/post.js';
import mongoose from 'mongoose';
export const createPost = async(req,res) => {
 try{
    const post=await new Post(req.body);
    post.save();
    return res.status(200).json('post is successfully saved');
 }
 catch(err){
    return res.status(500).json(err);
 }
}
export const getPosts=async(req,res)=>{
  let category=req.query.category;
  console.log(category);
  let posts;
 try{
  if(category){
    posts=await Post.find({categories:category});
  }else{
      posts=await Post.find({});}
   return res.status(200).json(posts);
 }catch(err){
   res.status(500).json({msg:err.message});
 }
}
export const getPost=async(req,res)=>{
 try{
  const o_id=new mongoose.Types.ObjectId(req.params.id);
  const postById=await Post.findOne({ _id:o_id});
  return res.status(200).json(postById);
 }
 catch(err){
   return res.status(500).json({msg:err.message});
 }
}

export const editPost=async(req,res)=>{
 try{
  const o_id=new mongoose.Types.ObjectId(req.params.id);
  const postById=await Post.findOne({ _id:o_id});
  if(!postById)
  {
    return res.status(404).json({msg:'post not found'});
  }
  await Post. findOneAndUpdate(postById, {$set:req.body});
    return res.status(200).json({msg:'post saves successfully'});
}
 catch(err){
  return res.status(500).json({msg:err.message});
 }
}
export const deletePost=async(req,res)=>{
try{
  const o_id=new mongoose.Types.ObjectId(req.params.id);
  const postById=await Post.findOne({ _id:o_id});
  if(!postById)
  {
    return res.status(404).json({msg:'post not found'});
  }
  else{
 await Post.deleteOne({ _id:o_id });
  return res.status(200).json({msg:'post deleted successfully'});}
}
catch(err){
 return res.status(500).json({msg:err.message});
}
}
