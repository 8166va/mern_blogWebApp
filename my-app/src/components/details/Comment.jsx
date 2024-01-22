import { Box, Typography ,styled} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useContext } from "react";
import { DataContext } from "../../contextapi/data-provider";
import { API } from "../../service/api";
const Component=styled(Box)`
margin-top:30px;
background-color:#DCDCDC;
padding:10px;
`;
const Container=styled(Box)`
display:flex;
margin-bottom:5px;
`;
const DeleteIcon=styled(Delete)(({ theme }) => ({
    marginLeft:'auto',
    ':hover': {
        color:'red',
      },
  }));
const Author=styled(Typography)`
font-weight:600;
margin-right:20px;
`;
const CommentDate=styled(Typography) `
color:grey;
`;
const SingleComment=({comment,setToggle})=>{
    const {account}=useContext(DataContext);
    const removeComment=async()=>{
            let response=await API.deleteComment(comment._id);
            if(response.isSuccess)
            {
                setToggle(prevState=>!prevState)
            }
    }
    return(
    <Component>
        <Container>
            <Author>{comment.name}</Author>
            <CommentDate>{new Date(comment.commentDate).toDateString()}</CommentDate>
            {
              account.userName===comment.name&&
              <>
               <DeleteIcon onClick={()=>removeComment()}/>
              </>
            }
        </Container>
        <Box>
            <Typography>{comment.postComment}</Typography>
        </Box>
    </Component>
    )
}
export default SingleComment;