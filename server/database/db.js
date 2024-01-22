import mongoose from "mongoose";



 const connection= async(USERNAME,PASSWORD)=>{
    const URL=`mongodb+srv://${USERNAME}:${PASSWORD}@blogapp.jcixe7z.mongodb.net/?retryWrites=true&w=majority`;
    try{
         await mongoose.connect(URL,{useNewUrlParser:true});
         console.log(`Database connected successfully`);
    }catch(error){
       console.log("error while connecting",error);
    }
};
export default connection;
