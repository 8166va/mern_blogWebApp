import { useState } from 'react';
import Login from './components/account/Login';
import DataProvider from './contextapi/data-provider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreateBlog from "../src/components/create/createBlog";
import EditBlog from "./components/create/EditBlog";
import {BrowserRouter,Routes,Route,Outlet,Navigate} from "react-router-dom";
import  DetailView  from './components/details/DetailView';

const PrivateRoute=({authenticated,...props})=>{
  return authenticated?
    <>
     <Header/>
     < Outlet/>
    </>
    :<Navigate replace to ='/login'/>
}
function App() {
  const [authenticated,setAuthenticated]=useState(false);
  return (
    <div>
      <DataProvider>
        <BrowserRouter>
       {/* poori application me routing enable kar dega */}
      <Routes>
      <Route path='/login' element={<Login setAuthenticated={setAuthenticated}/>}/>
      <Route path='/' element={<PrivateRoute authenticated={authenticated}/>} >
        <Route path='/' element={<Home/>}/>
      </Route>
      <Route path='/create' element={<PrivateRoute authenticated={authenticated}/>} >
        <Route path='/create' element={<CreateBlog/>}/>
      </Route>
      <Route path='/detail/:id' element={<PrivateRoute authenticated={authenticated}/>} >
        <Route path='/detail/:id' element={<DetailView/>}/>
      </Route>
      <Route path='/update/:id' element={<PrivateRoute authenticated={authenticated}/>} >
        <Route path='/update/:id' element={<EditBlog/>}/>
      </Route>
      </Routes>
      </BrowserRouter>
      </DataProvider>
    </div>
  );
}

export default App;
