import { Link } from "react-router-dom";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import Axios from "axios"
import { useNavigate } from "react-router-dom";

const initialValues={
    NewPassword:'',
    password:'',
}
const validate=values=>{
 const errors={};
 if(!values.NewPassword){
   errors.NewPassword="Required !!";
 }
 if(!values.password){
    errors.password="Required !!";
 }

 return errors;
}

const Forgetpassword = (props) => {
    const navigate=useNavigate();
    const onSubmit = (values, { resetForm }) => { 
        if(values.NewPassword!==values.password){
              toast.error("Please check passwords", {
                position: "top-center",
              });
              
        }else{
        //    setTimeout(
           Axios.post("https://posts-backend-two1.onrender.com/api/updatepassword",{
               NewPassword:values.NewPassword,
               email:props.email
           }) 
        //    ,5000)
           toast.success("Your password is successfully updated", {
            position: "top-center",
          });
           navigate("/login");
        
        }
        
    }
 

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    })
    return (
        <>


            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">

                    <h1 className="text-center text-2xl font-bold text-red-500 sm:text-3xl">
                        Password Conformation !!!
                    </h1>

                    <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4  shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Update your Password</p>



                        {/* ******************************* */}
                        <div>
                            <label htmlFor="NewPassword" className="sr-only">New Password</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="NewPassword"
                                    name="NewPassword"
                                    onChange={formik.handleChange}
                                    value={formik.values.NewPassword}
                                    onBlur={formik.handleBlur}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Your New Password"
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
                                {formik.touched.NewPassword && formik.errors.NewPassword ? (<div className=" mr-[350px] text-red-500">{formik.errors.NewPassword}</div>) : null}
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
                                    placeholder="confirm your Password"
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
                                {formik.touched.password && formik.errors.password ? (<div className=" mr-[350px] text-red-500">{formik.errors.password}</div>) : null}
                            </div>
                        </div>
                        {/* ************************ */}

                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">Update Password</button>

                    </form>


                    <p className="text-center text-sm text-gray-500">
                        Login into your account
                        <Link className="underline" to="/login">login</Link>
                    </p>
                </div>

            </div>
            <Toaster />
        </>
    )
}

export default Forgetpassword; 
