import express from "express";
import {signupUser,loginUser} from "../controller/user-controller.js";
import upload from "../utils/upload.js";
import {uploadImage} from "../controller/image-controller.js"
import {getImage} from "../controller/image-controller.js"
import {createPost,getPosts,getPost,editPost,deletePost} from "../controller/post-controller.js"
import {authenticateToken} from '../controller/jwt-controller.js'
import {saveComment,getComments,deleteComment} from "../controller/comment-controller.js";
const router= express.Router();
router.post('/login',loginUser);
router.post('/signup',signupUser);
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:image',getImage);
router.post('/create',authenticateToken,createPost);
router.get('/posts',authenticateToken,getPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken,editPost);
router.delete('/delete/:id',authenticateToken,deletePost);
router.post('/comment/new',authenticateToken,saveComment);
router.get('/comments/:id',authenticateToken,getComments);
router.delete('/comment/delete/:id',authenticateToken,deleteComment);
export default router;