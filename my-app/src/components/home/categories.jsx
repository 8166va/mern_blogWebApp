import {Button,Table,styled,TableHead,TableBody,TableRow,TableCell} from "@mui/material";
import { categories } from "../../constants/data";
import { Link ,useSearchParams} from "react-router-dom";
const StyledTable=styled(Table)`
border:1px solid rgba(224, 224, 224, 1);
`;
const StyledButton=styled(Button)`
margin:20px;
width:85%;
background-color:#966F33;
color:white;
text-decoration:none;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;
const Category=()=>{
    const [searchParam]=useSearchParams();
    const category= searchParam.get('category');
    return(
      <>
      <Link to={`/create?category=${category || ''}`} style={{textDecoration:'none'}}>
      <StyledButton variant="contained">Create Blog</StyledButton>
      </Link>
      <StyledTable>
        <TableHead>
            <TableRow>
                <TableCell>
                    <StyledLink to='/'>
                    All Categories
                    </StyledLink>
                </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                categories.map(category=>(
                    <TableRow key={category.id}>
                        <TableCell>
                            <StyledLink to={`/?category=${category.type}`}>
                            {category.type}
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
      </StyledTable>

      </>
    )
}
export default Category;