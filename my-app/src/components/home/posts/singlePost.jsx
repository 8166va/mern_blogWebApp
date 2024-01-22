import {Box, Typography,styled} from "@mui/material";
import {addElipsis} from "../../../utils/common-utils.js";
const Container=styled(Box)`
margin:10px;
border:1px solid #d3cede;
height:350px;
border-radius:10px;
display:flex;
align-items:center;
flex-direction:column;
&>p{
    padding:0 5px 5px 5px;
}
`;
const Image=styled('img')({
    width:'100%',
    objectFit:'cover',
    height:'150px',
    borderTopLeftRadius:'10px',
    borderTopRightRadius:'10px'
});
const StyledCategoryUser=styled(Typography)`
font-size:12px;
color:gray;
`;
const Title=styled(Typography)`
font-size:18px;
font-weight:600;
word-break:break-word;
`;
const Description=styled(Typography)`
font-size:14px;
word-break:break-word;
`;
const SinglePost=({post})=>{
    const url = post.picture ? post.picture : "https://coolwallpapers.me/picsup/3079341-apple_background_caffeine_candle_coffee_computer_desk_desktop-wallpaper_excel_hustle_iphone_iphone-6_job_laptop_layout_macbook_macbook-pro_minimalist_mug_notebook_organised_organize_pen_polka-dot.jpg";
 return(
    <Container>
        <Image src={url} alt='Post Image'/>
        <StyledCategoryUser>{post.categories}</StyledCategoryUser>
        <Title>{addElipsis(post.title,20)}</Title>
        <StyledCategoryUser>Author: {post.userName}</StyledCategoryUser>
        <Description>{addElipsis(post.description,100)}</Description>
    </Container>
 )
}
export default SinglePost;