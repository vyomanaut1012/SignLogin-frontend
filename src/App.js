import './App.css';
import Sign from "./components/Sign"
// import Show from './components/Show';
import Login from './components/Logins';
import { Route ,Routes } from 'react-router-dom';
import Forgetpassword from './components/ForgetPassword';
import GetOtp from './components/GetOtp';
import EmailForOTP from './components/EmailForOTP';
import VerifyEmail from './components/VerifyEmail';
// import Posts from './AppComponent/Posts';
import Profile from './components/Profile';
import { useState } from 'react';
import CreateNewPost from './AppComponent/CreateNewPost';
import TotalPost from './AppComponent/TotalPost';
import Navbar from './AppComponent/Navbar';
import YourPost from './AppComponent/YourPost';
import SamplePost from "./AppComponent/SamplePost";
// import Card from './AppComponent/Card';
import ShowPost from './AppComponent/ShowPost';

function App() {
   const [data,setdata]=useState(' ');
   const otpValue=(data)=>{
       console.log(data);
       setdata(data);
   }
   const [emailotp,setemailotp]=useState(' ');
   const mailotp=(data)=>{
       console.log(data);
       setemailotp(data);
   }
   const [email,setemail]=useState(' ');
   const emailhandler=(useremail)=>{
       setemail(useremail);
   }
   
  //  const [post,setpost]=useState(" ");
  //  const postToastHandler=(noti)=>{
  //        setpost(noti);
  //  }
   
  // console.log("url",url);

  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<Sign mailotp={mailotp}/>} />   
        <Route path="/login" element={<Login/>} />
        <Route path="/forget" element={<Forgetpassword email={email}/>}/>
        <Route path='/getotp' element={<GetOtp data={data}/>}/>
        <Route path='/verify' element={<VerifyEmail emailotp={emailotp}/>}/>
        <Route path='/email' element={<EmailForOTP otpValue={otpValue} emailhandler={emailhandler}/>}/>
        <Route path='/allpost' element={<Navbar/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/totalpost' element={<TotalPost/>}/>
        <Route path='/createpost' element={<CreateNewPost />}/>
        <Route path='/yourpost' element={<YourPost />}/>
        <Route path='/showpost' element={<ShowPost />}/>
        <Route path='/sample' element={<SamplePost />}/>
        
       </Routes>
    </div>
  );
}

export default App;
