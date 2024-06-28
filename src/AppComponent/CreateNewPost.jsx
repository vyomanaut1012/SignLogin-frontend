// import Posts from "./Posts";
import {useFormik} from "formik";
import { useRef } from "react";
import { useState } from "react";
import POST from "../assets/Images/post1.svg";
// import {useNavigate} from "react-router-dom";
import Axios from "axios";
import React from "react";
import Typewriter from "./Typewriter";
// import post from "../assets/Images/post1.svg"
import { Link } from "react-router-dom";
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// let drop=true;

const CreateNewPost=(props)=>{
   //   const Navigate=useNavigate();
   //   const [Selects, setSelects]= useState(" ");
     const [post, setpost]=useState(" ");
     const email=cookies.get("email");
     const Email=email+"@gmail.com";
     const months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]
     const currentDate = new Date();
     const year = currentDate.getFullYear(); // 4-digit year
     const month = currentDate.getMonth() ; // Month (0-11, so we add 1)
     const day = currentDate.getDate();
     const Day=String(day);
     const Year=String(year);
     const Dat=Day+"/"+months[month]+"/"+Year;
     const initialValues={
         title:'',
         content:'',
         Tags:''
     }

     const validate=values =>{
        const errors={};
        if(!values.title){
            errors.title="Required !!";
        }
        if(!values.content){
           errors.content="Required !!";
        }
        if(!values.Tags){
            errors.Tags="Required !!";
         }
        return errors;
    }

      const onSubmit=(values,{resetForm})=>{
      Axios.post("https://posts-backend-two1.onrender.com/api/postdata",{
         email:Email,
         title:values.title,
         content:values.content,
         url:values.url,
         tag:values.Tags,
         date:Dat 
      },{
        withCredentials: true,
      }).then((response)=>{        
        setpost(response.data.message);
      })
      // console.log(values.Tags);
      resetForm();
      if(post==="publish"){
         toast.success("Your Post is successfully posted",{
           position: "top-center",         
        });   
       }
      // Navigate("/allpost");
    }
const formik=useFormik({
  initialValues,
  validate,
  onSubmit,
}) 

//****************************************** */
     const inputRef=useRef(null);
     
     const imageClickHandler=()=>{
        inputRef.current.click();
     }
     const [selectImage,setSelectImage]= useState('');
     const imageHandler=(event)=>{
        setSelectImage(event.target.files[0]);
     }

     const [url, seturl] = useState(' ');
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
     formik.values.url=url;


     //******************************************************** */
     const inputStyle = {
        fontSize: '16px', 
        fontStyle: 'bold'
      };

    // ***************************************************
    //  const [tag, setTag] = useState('');

    //  const handleChange = (event) => {
    //    setTag(event.target.value);
    //    formik.values.Tags=tag;
    //    console.log(formik.values.Tags);
    //   };

    //************************************************** */   
    
     return (
        <>
           {/* <Posts/> */}
           <div className=" bg-[#ffffff] max-w-[1080px] mx-auto">
           <h1 className=" items-center text-[20px] text-black lg:font-semibold lg:text-[25px] pt-5 ">
               What's<Typewriter text= " going on in Your Mind ??"delay={100} infinite />
             {/* <Typewriter text="What's going on in Your Mind ??" delay={100}/>  */}
           </h1>

            <div>
                <img
                 style={{
                    borderRadius: "5%",
                    objectFit: "cover",
                    border:"2px solid #36454f",
                    
                 }}
                 src={url===' ' ? POST : url}
                 alt=""
                 className=" mx-auto mt-10 w-[275px] h-[145px] md:w-[450px] md:h-[200px] lg:w-[630px] lg:h-[300px] rounded-md"
                 onClick={imageClickHandler}
                 />

                <input className="rounded-md mr-4 bg-white" type="file" ref={inputRef} 
                 style={{display:"none"}}
                 onChange={imageHandler}
                />

                <button className=" text-white bg-yellow-400 px-2 py-1 lg:px-3 lg:py-2 rounded-md font-semibold mt-2 " 
                  onClick={imageUpload}>
                  submit
                </button>

            </div>

            <div>
              <div className="mx-auto max-w-[700px] px-4 py-8">
               <form onSubmit={formik.handleSubmit} className="mb-0 space-y-2 rounded-lg p-4 ">
                <label htmlFor="title" className="sr-only">Title</label>
                <textarea
                    type="textarea" 
                    id="title" 
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-gray-500 p-2 text-[20px] lg:h-24 py-4 shadow-lg"
                    placeholder="Title"
                    // style={titleStyle}
                />
                {formik.touched.title && formik.errors.title ? (<div className=" mr-[550px] text-red-500">{formik.errors.title}</div>):null}

                <label htmlFor="content" className="sr-only">Title</label>
                <textarea
                    type="textarea" 
                    id="content" 
                    name="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-lg border-gray-500 p-4 pb-20 text-lg shadow-lg"
                    placeholder="Tell us your story . . . ."
                    style={inputStyle}
                />
                {formik.touched.content && formik.errors.content ? (<div className=" mr-[550px] text-red-500">{formik.errors.content}</div>):null}





                {/* <FormControl sx={{ m: 1, minWidth: 120, marginRight: 330, boxShadow:2,fontFamily:"sans-serif"}} size="small" className=" bg-white max-w-[750px]">
                   <InputLabel id="demo-select-small-label">Tags</InputLabel>
                    <Select
                     labelId="demo-select-small-label"
                     id="demo-select-small"
                     value={formik.values.Tags}
                     label="Tags"
                     name="Tags"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                    >
                     <MenuItem value="">
                       <em>None</em>
                     </MenuItem>
                     <MenuItem value={"Web Development"}>Web Development</MenuItem>
                     <MenuItem value={"Android Developemnt"}>Android Developemnt</MenuItem>
                     <MenuItem value={"Data Sructure and Algorithm"}>Data Sructure and Algorithm</MenuItem>
                     <MenuItem value={"Robotics"}>Robotics</MenuItem>
  
                    </Select>
            </FormControl> */}
            
         <div className=" border-black ">
            <h2 className="text-lg text-gray-700 font-semibold ">Select Tag</h2>
            {/* <select value={Selects} 
                    onChange={e=>setSelects(e.target.value)}> */}
               <select
                     id="Tags"
                     value={formik.values.Tags}
                     label="Tags"
                     name="Tags"
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     className=" px-6 py-4 bg-white shadow-2xl "
                     placeholder="Tag"
               >
               <option></option>
               <option>Web Development </option>
               <option>Android Developemnt </option>
               <option>Data Sructure and Algorithm</option>
              </select>
         </div>
            {formik.touched.Tags && formik.errors.Tags ? (<div className=" mr-[550px] text-red-500">{formik.errors.Tags}</div>):null}

               <button type="submit" className=" text-white bg-yellow-400 px-4 py-2 rounded-md font-semibold">Publish</button>

                        
             
               <p class="text-end text-base text-gray-600">    
                 <Link className=" underline text-lg mx-1 mr-3" to="/totalpost">see your post</Link>
               </p>
         </form>   
            </div>
              
            </div>                
           </div>
           <Toaster />
        </>
     )
}

export default CreateNewPost;