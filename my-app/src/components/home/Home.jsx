import {styled,Grid} from "@mui/material";
import Banner from "../banner/Banner";
import Category from "./categories";
import Post from "./posts/post"
const Component=styled('div')({
marginTop:64
});
const Home=()=>{
    return(
        <Component>
           <Banner/>
           <Grid container>
            <Grid item lg={2} sm={2} xs={12}>
           <Category/>
           </Grid>
           <Grid container item lg={10} sm={10} xs={12}>
            <Post/>
           </Grid>
           </Grid>

        </Component>

    )
}
export default Home;