import multer from "multer";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const USERNAME=process.env.MongoDB_USERNAME;
const PASSWORD=process.env.MongoDB_PASSWORD;
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})
 const upload=multer({
   storage:storage 
})
export default upload;