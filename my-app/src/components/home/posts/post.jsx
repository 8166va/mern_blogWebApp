import {useEffect,useState} from "react";
import {API} from "../../../service/api.js"
import { Box,Grid,styled } from "@mui/material";
import { useSearchParams,Link } from "react-router-dom";
import  SinglePost from "./singlePost";
const NoPostBox=styled(Box)`
color:brown;
margin:30px 80px;
font-size:18;
`;
const StyledLink=styled(Link)`
text-decoration:none;
color:inherit;
`;
const Post=()=>{
    const [posts,setPosts]=useState([]);
    const [searchParams]=useSearchParams();
    const category=searchParams.get('category');
    useEffect(()=>{
     const fetchPosts=async ()=>{
         let response=await API.displayPosts({ category : category || '' });
         if(response.isSuccess){
            setPosts(response.data);
         }
     }
     fetchPosts();
    },[category])
   return( 
     
     <>
     {
         posts?.length ? posts.map(post=>(
            <Grid item lg={3.5} sm={4} xs={12} key={post.title}>
               <StyledLink to={`detail/${post._id}`}>
             <SinglePost post={post}/>
             </StyledLink>
             </Grid>
        )):<NoPostBox>No data available to display</NoPostBox>
        
     }
     </>
   )
}
export default Post;