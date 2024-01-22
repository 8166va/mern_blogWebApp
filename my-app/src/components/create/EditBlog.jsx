import { useState ,useEffect,useContext} from "react";
import {styled,FormControl,InputBase,Button,TextareaAutosize} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate,useLocation,useParams } from "react-router-dom";
import {DataContext} from "../../contextapi/data-provider";
import axios from "axios";
import { API } from "../../service/api.js";
const Component=styled('div')(({ theme }) => ({
    margin: '114px 100px',
    [theme.breakpoints.down('md')]: {
        margin: '114px 0 0 0',
    },
  }));
const Image=styled('img')({
width:'100%',
height:'50vh',
objectFit:'cover'
});
const StyledButton=styled(Button)`

background-color:#FF0099;
color:white;
`;
const StyledForm=styled(FormControl)`
margin-top:20px;
display:flex;
flex-direction:row;
`;
const StyledInput=styled(InputBase)`
flex:1;
margin:0 30px;
font-size:25px;
`;
const StyledTextarea=styled(TextareaAutosize)`
width:100%;
margin-top:20px;
font-size:18px;
border:none;
&:focus-visible{
    outline:none;
}
`;
const initialPost={
title:'',
description:'',
userName:'',
picture:'',
categories:'',
createdDate:new Date()
};
const EditBlog=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');
    const { id } =useParams();
    const { account } =useContext(DataContext);
    const url=post.picture?post.picture:"https://coolwallpapers.me/picsup/3079341-apple_background_caffeine_candle_coffee_computer_desk_desktop-wallpaper_excel_hustle_iphone_iphone-6_job_laptop_layout_macbook_macbook-pro_minimalist_mug_notebook_organised_organize_pen_polka-dot.jpg";
    const convertToBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader=new fileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result)
            };
            fileReader.onerror=(error)=>
            {
                reject(error);
            }
        })
    }
    const handleImage=async (e)=>{
        console.log(e.target.files[0]);
        setFile(await convertToBase64(e.target.files[0]));
    }
    useEffect(()=>{
        const fetchData=async()=>{
          let response=await API.getPostById(id);
          if(response.isSuccess){
              setPost(response.data);
          }
        }
        fetchData();
      },[])
    useEffect(()=>{
        const getImage=async()=>{
         if(file)
         {
            const data=new FormData();
            data.append("name",file.name);
            data.append("file",file);
            let response = await axios.post("http://localhost:8000/file/upload",data);
            post.picture=response.data;
         }}
      getImage();
     post.categories=location.search?.split('=')[1]||'All';
     post.userName=account.userName;
    },[file])
    const onInputChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value});
    }
    const EditPost=async ()=>{
      let response= await  API.EditPost(post);
      if(response.isSuccess)
      {
        navigate(`/detail/${id}`);
      }
    }
    return(
        <Component>
          <Image src={url} alt='Image'/>
        <StyledForm>
            <label htmlFor="fileInput" >
              <AttachFileIcon fontSize='large'color='action'/>
            </label>
            <input
             type='file' 
             id='fileInput' 
             style={{display:'none'}}
             onChange={(e)=>setFile(e.target.files[0])}/>
            <StyledInput placeholder="Title"value={post.title} onChange={(e)=>{onInputChange(e)}} name='title'/>
            <StyledButton variant='contained' onClick={()=>EditPost()}>Update</StyledButton>
        </StyledForm>
        <StyledTextarea placeholder='Tell your story...' value={post.description} minRows={5} onChange={(e)=>{onInputChange(e)}} name='description' />
        </Component>
    )
}
export default EditBlog;