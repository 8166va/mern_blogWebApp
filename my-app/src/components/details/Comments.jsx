import PersonIcon from '@mui/icons-material/Person';
import{styled,Box,TextareaAutosize, Button} from "@mui/material";
import{useState,useContext,useEffect} from "react";
import { DataContext } from '../../contextapi/data-provider';
import { API } from '../../service/api';
import SingleComment from './Comment';
const Container=styled(Box)`
column-gap:10px;
display:flex;
`;
const Component=styled(Box)`
margin:50px 0 20px 0;
color:#966F33;
font-size:20px;
font-weight:600;
`;
const TextArea=styled(TextareaAutosize)`
width:100%;
height:100px;
`;
const  UserImage=styled(PersonIcon)`
width:50px;
height:50px;
`;
const StyledButton=styled(Button)`
background-color:#966F33;
color:white;
height:50px;
`;
const initialValue={
    name:'',
    postId:'',
    postComment:'',
    commentDate:new Date()
}
const Comment=({post})=>{
    const [comment,setComment]=useState(initialValue);
    const {account}=useContext(DataContext);
    const [comments,setComments]=useState([]);
    const [toggle,setToggle]=useState(false);
    useEffect(()=>{
      const getData=async()=>{
        const response=await API.getAllComments(post._id);
        if(response.isSuccess){
            setComments(response.data);
          }
      }
      if(post._id){
        getData();
     }
    },[post,toggle]);
    const handleChange=(e)=>{
        setComment({
            ...comment,
            name:account.userName,
            postId:post._id,
            postComment:e.target.value
        });
    }
    const addComment=async()=>{
   let response=await API.postComment(comment);
        if(response.isSuccess){
          setComment(initialValue);
          setToggle(prevState=>!prevState);
        }
    }
return(
    <>
    <Component>
        Add New Comment
    </Component>
    <Container>
        <UserImage/>
        <TextArea
        minRows={5}
        placeholder='Type Your Comment here'
        value={comment.postComment}
        onChange={(e)=>handleChange(e)}/>
        <StyledButton variant="contained" onClick={(e)=>addComment(e)}>Submit Comment</StyledButton>
    </Container>
    <Box>
    {
         comments&&comments.length&&comments.map(singlecomment=>(
             <SingleComment 
             key={singlecomment._id}
             comment={singlecomment}
             setToggle={setToggle}/>
        ))
        
     }
    </Box>
    </>
)
}
export default Comment;