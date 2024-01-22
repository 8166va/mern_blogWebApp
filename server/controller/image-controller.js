import Image from "../model/images.js";
export const uploadImage=async (req,res)=>{
  const Url='http://localhost:8000';
try{
  const newImage=new Image({image:req.file.filename});
   await newImage.save();
  const imageUrl=`${Url}/images/${req.file.filename}`;
return res.status(200).json(imageUrl);
}
catch(err){
  return res.status(500).json({msg:"unable to upload image"})
}
}
export const getImage=async (req,res)=>{
  let ImageName = req.params.image;
  await Image.findByOne({ id: ImageName }, (err, data) => {
    if (err) {
      res.status(500).json({
        message: "Something went wrong, please try again later.",
      });
    } else {
      res.status(200).json({
        message: "Image found"
      });
    }
  });

}