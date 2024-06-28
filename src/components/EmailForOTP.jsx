import { Link } from "react-router-dom";
import { useFormik } from "formik";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues={
    email:'',
}
const validate=values=>{
 const errors={};
 if(!values.email){
   errors.email="Required !!";
 }

 return errors;
}
const EmailForOTP =(props)=>{
const Navigate=useNavigate();

const onSubmit = (values, { resetForm }) => { 
    console.log("email",values.email);
    Axios.post("https://posts-backend-two1.onrender.com/api/getotp",{
            email:values.email,
    },{
        withCredentials:true,
    })
    .then((res)=>{
        props.otpValue(res.data.otp);
        props.emailhandler(values.email);
    })
     resetForm();
    Navigate("/getotp");

}  
    const formik = useFormik({
        initialValues,
        validate,
        onSubmit,
    })
    
    return (
        <>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">

                    {/* <h1 className="text-center text-2xl font-bold text-red-500 sm:text-3xl">
                        Password Conformation !!!
                    </h1> */}

                    <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4  shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Enter Registered Email for OTP</p>



                        {/* ******************************* */}
                        <div>
                            <label htmlFor="email" className="sr-only">OTP</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Your registered email"
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
                                {formik.touched.email && formik.errors.email ? (<div className=" mr-[350px] text-red-500">{formik.errors.email}</div>) : null}
                            </div>
                        </div> 
                        {/* ************************ */}

                       {/* <Link to={"/email"}> */}
                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 mt-3 px-5 py-3 text-sm font-medium text-white">Submit</button>
                        {/* </Link> */}
                    </form>


                    <p className="text-center text-sm text-gray-500">  
                        Already Registered     
                        <Link className="underline ml-2" to="/login">login</Link>
                    </p>
                </div>

            </div>
            {/* <Toaster/> */}
        </>
    )
}

export default EmailForOTP;