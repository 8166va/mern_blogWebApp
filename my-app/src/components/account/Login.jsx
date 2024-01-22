import { Box ,TextField,Button,styled,Typography} from "@mui/material";
import blogImage from "../images/blog-image.jpg";
import { useState,useContext } from "react";
import  {API} from "../../service/api";
import { DataContext } from "../../contextapi/data-provider";
import { useNavigate } from "react-router-dom";
//useNavigate->use to navigate to home if successful login
const Component=styled(Box)`
width:400px;
margin:auto;
box-shadow:5px 2px 5px 2px rgb(0 0 0/0.6);
margin-top:34px;
`;

const Image=styled('img')({
    width:200,
margin:'auto',
display:"flex",
padding:'50px 0 0' 
});

const Wrraper=styled(Box)`
display:flex;
flex-direction:column;
padding:25px 35px ;
flex:1;
&>div,&>button,&>p{
    margin-top:20px;
}
&>p{
    text-align:center;
}
`;
const initialSignupDetails={
name:'',
userName:'',
password:''
};
const initialloginDetails={
    userName:'',
    password:''
    };
const LoginButton=styled(Button)`
    text-transform:none;
    background:Magenta;
    height:48px;
    font-size:16px;
    font-weight:600;
`;
const Type=styled(Typography)`
color:gray;
`;
const SignInButton=styled(Button)`
text-transform:none;
box-shadow:0px 2px 4px 0px rgb(0 0 0 /0.5);
margin-left:10px;
font-weight:700;
`;
const Error=styled(Typography)`
    font-size:10px;
    color:red;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`
const Login = ({setAuthenticated}) => {
    const [account,setAccount]=useState('login');
    const [signUpDetail,setSignUpDetail]=useState(initialSignupDetails);
    const [login,setLogin]=useState(initialloginDetails);
    const [error,setError]=useState('');
    const { contextAccount }=useContext(DataContext);
    const navigate=useNavigate();
    const onInputChange=(e)=>{
        setSignUpDetail({...signUpDetail,[e.target.name]:e.target.value});
        console.log(signUpDetail);
    }
    const onloginValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }
    const signupUser = async () => {
        let response = await API.userSignup(signUpDetail);
        if(response.isSuccess)
        {
            setSignUpDetail(initialSignupDetails);
            setError('');
            setAccount('login');

        }else{
        setError('something went wrong ,please try again later');
        }
    }
    const loginUser=async()=>{
     let response=await API.userLogin(login);
     if(response.isSuccess){
        setError('');
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
        contextAccount({userName:response.data.userName,name:response.data.name});
        setAuthenticated(true);
       navigate('/');
     }
     else{
        setError('something went wrong ,please try again later');
     }
    }
  return (
    <Component>
        <Image src={blogImage} alt="blog-image"/>
           { account==='login'?
                <Wrraper>
                <TextField variant="standard" value={login.userName} onChange={(e)=>{onloginValueChange(e)}} name='userName'label='Enter Username'/>
                <TextField variant="standard" value={login.password} onChange={(e)=>{onloginValueChange(e)}} name='password'label='Enter Password'/>
                {error &&<Error>{error}</Error>}
                <LoginButton variant="contained"onClick={()=>loginUser()}>Login</LoginButton>
                <Type>OR</Type>
                <Typography>Don't have an account?<SignInButton onClick={()=>setAccount('signup')}>Create new</SignInButton></Typography>
                </Wrraper>
            :
                <Wrraper>
                <TextField variant="standard" onChange={(e)=>{onInputChange(e)}} name='name'label='Enter Name'/>
                <TextField variant="standard" onChange={(e)=>{onInputChange(e)}} name='userName'label='Enter Username'/>
                <TextField variant="standard" onChange={(e)=>{onInputChange(e)}} name='password'label='Enter Password'/>
                {error &&<Error>{error}</Error>}
                <LoginButton variant="contained" onClick={()=>signupUser()}>Sign-Up</LoginButton>
                <Type>OR</Type>
                <Typography>Already have an account?<SignInButton onClick={()=>setAccount('login')}>Login</SignInButton></Typography>
                </Wrraper>}
    </Component>
  )
}

export default Login;

