import {useFormik} from "formik";
import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import toast, { Toaster } from 'react-hot-toast';
// import { useEffect } from "react";

const initialValues={
       email:'',
       password:'',
}
const validate=values=>{
    const errors={};
    if(!values.email){
      errors.email="Required !!";
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email="invalid email address !!";
    }

    if(!values.password){
       errors.password="Required !!";
    }

    return errors;
}

// Axios.get("http://localhost:5050/api/login",{
//     responseType: "json",
// })
// .then((res)=>{
//     console.log(res.data);
// })

function Logins(){
    const Navigate=useNavigate();
    


    const onSubmit=(values,{resetForm})=>{
 
        // console.log("values",values);
        Axios.post("https://signlogin-backend.onrender.com/api/login",{
            email:values.email,
            password:values.password,
        },{
            withCredentials:true,
        }).then((res)=>{
            // console.log(res.data);
            if(res.data.message==="Login successful"){
                 Navigate("/show");
            }else if(res.data.message==="NotRegistered"){
                 toast.error("email is not register", {
                    position: "top-center",
                  });
            }else if(res.data.message==="wrongPassword"){
                toast.error("password is not matched", {
                   position: "top-center",
                 });
           }

        })
        resetForm();
       
    }


    const formik=useFormik({
        initialValues,
        validate,
        onSubmit
    })
     
   

  

    return (
        <>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
         <div className="mx-auto max-w-lg">

         <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                             Get started today
         </h1>

         <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
         <p className="text-center text-lg font-medium">Login into your account</p>



{/* ******************************* */}
<div>
<label htmlFor="email" className="sr-only">E-mail</label>
<div className="relative">
          <input
            type="text" 
            id="email" 
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Your Email"
          />

         <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
          {formik.touched.email && formik.errors.email ? (<div className=" mr-[350px] text-red-500">{formik.errors.email}</div>):null}
        </div>
      </div>
{/* ************************ */}

             

 {/* ******************************* */}
 <div>
<label htmlFor="password" className="sr-only">Password</label>
<div className="relative">
          <input
             type="text" 
             id="password" 
             name="password"
             onChange={formik.handleChange}
             value={formik.values.password}
             onBlur={formik.handleBlur}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter Your Password"
          />

         <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </span>
          {formik.touched.password && formik.errors.password ? (<div className=" mr-[350px] text-red-500">{formik.errors.password}</div>):null}
        </div>
      </div>
{/* ************************ */}

<button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">Sign Up</button>

</form>

    
        <p className="text-center text-sm text-gray-500">
          Create an Account
          <Link className="underline" to="/">Sign Up</Link>
         </p>
</div>
         
</div>
<Toaster />
</>

    )
}
export default Logins;