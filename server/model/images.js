import mongoose from "mongoose";
const ImageSchema=mongoose.Schema({
    image:{
        type:String
    }
});
const image=mongoose.model('image',ImageSchema);
export default image;