import React from "react";
import Axios from "axios";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


const initialValues = {
  fullname: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

const validate = values => {
  const errors = {};
  if (!values.fullname) {
    errors.fullname = "Required !!";
  }

  if (!values.email) {
    errors.email = "Required";
  }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address !!";
  }

  if (!values.phone) {
    errors.phone = "Required !!";
  }

  if (!values.password) {
    errors.password = "Required !!";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required !!";
  }

  return errors;
}


function Sign(props) {
  const Navigate=useNavigate();


    const check=()=>{
      const jwt=cookies.get("jwt");
      console.log("mila token??",cookies.get("jwt"));
      Axios.post("https://posts-backend-two1.onrender.com/api/auth",{
        token: jwt
      },{
        withCredentials: true,
      }).then((res)=>{
          if(res.data.message==="YesToken"){
              Navigate("/allpost");
          }
      }) 
    }
    check();
  
    const onSubmit = (values, { resetForm }) => {
    console.log("form-data", values);
    if(values.password !== values.confirmPassword){
       return toast.error("password are not matched", {
        position: "top-center",
      });
    }
    
    Axios.post("https://posts-backend-two1.onrender.com/api/signup",{
      name: values.fullname,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
      url: values.url,
    },{
      withCredentials: true,
    }).then((res) => {
      if (res.data.message === "exist") {
          toast.error("email is already register", {
          position: "top-center",
        });
      }
      else {

        // console.log("asli token",res.data.Token);
        const Email=values.email.split("@");
        cookies.set("email", Email[0],{
         expires:new Date(Date.now()+60*10000*1000),// in millisecond
        });
        cookies.set( 'jwt', res.data.Token,{
         expires:new Date(Date.now()+60*10000*1000),// in millisecond
        });


        Axios.post("https://posts-backend-two1.onrender.com/api/getotp", {
          email: values.email,
        }, {
          withCredentials: true,
        })
        .then((res)=>{
           props.mailotp(res.data.otp);
        })
        Navigate("/verify");
      }
    })
    resetForm();
  }




  const url = ' ';


  const formik = useFormik({
    initialValues,
    validate,
    onSubmit,
  })
  formik.values.url = url;

  return (
    <>
      <div>
        <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="mx-auto max-w-lg">

            <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Get started today
            </h1>

            <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
              <p class="text-center text-lg font-medium">Sign in to your account</p>



              {/* ******************************* */}
              <div>
                <label htmlFor="fullname" class="sr-only">FullName</label>
                <div class="relative">
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    onChange={formik.handleChange}
                    value={formik.values.fullname}
                    onBlur={formik.handleBlur}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Your Name"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                  {formik.touched.fullname && formik.errors.fullname ? (<div className=" mr-[350px] text-red-500">{formik.errors.fullname}</div>) : null}
                </div>
              </div>
              {/* ************************ */}



              {/* ******************************* */}
              <div>
                <label htmlFor="email" class="sr-only">E-mail</label>
                <div class="relative">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Your Email"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                  {formik.touched.email && formik.errors.email ? (<div className=" mr-[350px] text-red-500">{formik.errors.email}</div>) : null}
                </div>
              </div>
              {/* ************************ */}

              {/* ******************************* */}
              <div>
                <label htmlFor="phone" class="sr-only">Phone No.</label>
                <div class="relative">
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Your Phone No"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                  {formik.touched.phone && formik.errors.phone ? (<div className=" mr-[350px] text-red-500">{formik.errors.phone}</div>) : null}
                </div>
              </div>
              {/* ************************ */}




              {/* ******************************* */}
              <div>
                <label htmlFor="password" class="sr-only">Password</label>
                <div class="relative">
                  <input
                    type="text"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Your Password"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                  {formik.touched.password && formik.errors.password ? (<div className=" mr-[350px] text-red-500">{formik.errors.password}</div>) : null}
                </div>
              </div>
              {/* ************************ */}



              {/* ******************************* */}
              <div>
                <label htmlFor="confirmPassword" class="sr-only">Confirm Password</label>
                <div class="relative">
                  <input
                    type="text"
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Your Password"
                  />

                  <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 text-gray-400"
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
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (<div className=" mr-[350px] text-red-500">{formik.errors.confirmPassword}</div>) : null}
                </div>
              </div>
              {/* ************************ */}




              <button className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">Sign Up</button>
            </form>



            <p class="text-center text-sm text-gray-500">
              Already have account
              <Link class="underline" to="/login">Login</Link>
            </p>
          </div>

        </div>
      </div>

      <Toaster />
    </>


  )
}

export default Sign;