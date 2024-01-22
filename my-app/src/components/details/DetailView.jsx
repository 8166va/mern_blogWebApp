import { styled,Box,Typography } from "@mui/material";
import {Edit,Delete} from "@mui/icons-material";
import {useEffect,useState,useContext} from "react";
import { useParams,Link,useNavigate} from "react-router-dom";
import {DataContext} from "../../contextapi/data-provider";
import { API } from "../../service/api";
import EditBlog from "../create/EditBlog";
import Comment from "../details/Comments";
const Component=styled('div')(({ theme }) => ({
  margin: '114px 100px',
  [theme.breakpoints.down('md')]: {
      margin: '114px 0 0 0',
  }
}));
const Image=styled('img')({
        width:'100%',
        height:'50vh',
        objectFit:'cover'
        });
const Icon=styled(Box)`
float:right;
`  ;      
const EditIcon=styled(Edit)`
margin:5px;
padding:5px;
color:blue;
border:1px solid gray;
border-radius:10px;
`;
const DeleteIcon=styled(Delete)`
margin:5px;
padding:5px;
color:red;
border:1px solid grey;
border-radius:10px;
`;
const Title=styled(Typography)`
font-weight:600;
font-size:38px;
text-align:center;
margin:50px 0 10px 0;
word-break:break-word;
`; 
const Author=styled(Typography)`
color:grey;
font-size:18px;
display:flex;
margin:10px 0;
`;
const Span=styled('span')({
fontWeight:'600'
});
const CreateDate=styled(Typography)`
margin-left:auto;
`;
const Description=styled(Typography)`
word-break:break-word;
`;
const DetailView=()=>{
     const Navigate=useNavigate();
    const [post,setPost]=useState({});
    const { id } =useParams();
    const {account}=useContext(DataContext);
    const DeleteBlog=async()=>{
      let response=await API.deletePost(post._id);
      if(response.isSuccess){
        Navigate('/');
      }
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
    const url=post.picture?post.picture:"https://coolwallpapers.me/picsup/3079341-apple_background_caffeine_candle_coffee_computer_desk_desktop-wallpaper_excel_hustle_iphone_iphone-6_job_laptop_layout_macbook_macbook-pro_minimalist_mug_notebook_organised_organize_pen_polka-dot.jpg";
    return(
        <Component>
          <Image src={url} alt='post-image'/>
          <Icon>
            {
              account.userName===post.userName&&
              <>
              <Link to={`/update/${post._id}`}> <EditIcon/></Link>
               <DeleteIcon onClick={()=>DeleteBlog()}/>
              </>
            }
          </Icon>
          <Title>{post.title}</Title>
          <Author>
            <Typography>Authored by:<Span>{post.userName}</Span></Typography>
            <CreateDate>{new Date(post.createdDate).toDateString()}</CreateDate>
          </Author>
          <Description>{post.description}</Description>
          <Comment post={post}/>
        </Component>
    )
}
export default DetailView;