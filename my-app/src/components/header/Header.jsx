import {AppBar,Toolbar,Typography,styled} from "@mui/material";
import { Link } from "react-router-dom";
const Component=styled(AppBar)`
background-color:white;

`
const Container=styled(Toolbar)`
&>a{
    text-decoration:none;
    color:black;
   padding:20px;
}
`;

const Header=()=>{
    return(
  <Component>
    <Container>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/contact'>Contact</Link>
      <Link to='/login'>Log out</Link>
    </Container>
  </Component>
    )
}
export default Header;