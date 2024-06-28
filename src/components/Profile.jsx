import React from "react";
import sign from "../assets/Images/bgp1.png";
import {useRef, useState} from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Profile(){

    // const navigate = useNavigate();
    const inputRef=useRef(null);
    const imageClickHandler=()=>{
        inputRef.current.click();
    }
    const [selectImage,setSelectImage]= useState('');
    const [url, seturl] = useState(' ');
  
    const imageHandler=(event)=>{
        setSelectImage(event.target.files[0]);
    }
    const imageUpload=()=>{
        const formData=new FormData();
        formData.append("file",selectImage);
        formData.append("upload_preset","flc7znhd");
    
        Axios.post(
            "https://api.cloudinary.com/v1_1/ddyn2w9v5/image/upload",formData
        ).then((response)=>{
            seturl(response.data.url);
        })
    }
    const email=cookies.get("email");
    const changeURL=()=>{
    Axios.post("https://posts-backend-two1.onrender.com/api/updateURL",{
      email:email,
      url:url
    });
    }
    if(url!==' '){
       changeURL();
    }
    return(
        <>
       <div>
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg shadow-xl">
            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl mb-10">
             Please Set Your Profile Image
            </h1>
            <div className="flex flex-col justify-center items-center space-y-10" >
              <img 
                style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border:"4px solid #4B9CD3",
                }}
                src={url===' ' ? sign : url}
                alt=""
                onClick={imageClickHandler}
              />
              <input className=" text-yellow  rounded-md mr-4 bg-white" type="file" ref={inputRef} 
               style={{display:"none"}}
               onChange={imageHandler}
              />
              <button className=" text-white bg-indigo-600 px-4 py-2 rounded-md font-semibold" 
               onClick={imageUpload}>
               submit
              </button>
            </div>

            <p class="text-end text-base text-gray-500">
                 Go to 
                 <Link className="underline mx-1 mr-3" to="/totalpost">Next</Link>
              </p>
          </div>
         </div>
        </div>
       </>
    )
}

export default Profile; 