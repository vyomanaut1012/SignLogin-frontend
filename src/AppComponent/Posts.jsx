import {Link} from "react-router-dom"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from 'universal-cookie';
import pro from "../assets/Images/bgp1.png"
// import toast, { Toaster } from 'react-hot-toast';
const cookies = new Cookies();
const Posts=(props)=>{
    const [url,seturl]=useState(' ');
    const email=cookies.get("email");
    const Email=email + "@gmail.com";
    Axios.post("https://posts-backend-two1.onrender.com/api/userdata",{
        email:Email,
    }).then((response)=>{
        seturl(response.data.url);
    });
    
    const Navigate=useNavigate();
    const imageHandler=()=>{
        Navigate("/profile");
    }
    const goLink=()=>{
        Navigate("/login"); 
    }
    return(
     <>
      <div className="flex flex-row justify-start text-gray-500 shadow-sm sticky bg-white top-0 overflow-hidden z-10  items-center">
       <div className="my-10 text-xl">
          ENJOY POST
       </div>
       {/* <div className="flex flex-row justify-start"> */}
       <div className=" font-semibold invisible">
          <ul className="hidden space-x-8 mr-10 my-10 text-lg">
                <li>
                <Link to="/createpost">Create your Post</Link>
                </li>
                <li>
                  <Link to="/projects">Your Posts</Link>
                </li>
                <li>
                  <Link to="/about">Liked Post</Link>
                </li>
          
          </ul>
       </div>
       <div>
          <button 
            className=" text-white mt-9  bg-indigo-600 px-2 py-1 rounded-md hover:bg-cyan-700"  onClick={goLink}>           
            Login
          </button>
       </div>
       <div className="m-5 ml-12">
            <img
              style={{
                 width: "70px",
                 height: "70px",
                 borderRadius: "50%",
                 objectFit: "cover",
                 border:"1px solid #4B9CD3",
             }}
             src={url===' ' || url=== undefined ? pro : url}
             alt=""
             onClick={imageHandler}
            />
       </div>
       </div>
       {/* </div> */}
       {/* <Toaster /> */}
     </>
    )
}

export default Posts;