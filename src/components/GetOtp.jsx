import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
// import Axios from "axios";

const initialValues = {
    otp: '',
}
const validate = values => {
    const errors = {};
    if (!values.otp) {
        errors.otp = "Required !!";
    }

    return errors;
}


const GetOtp = (props) => {
    const navigate=useNavigate();
    const onSubmit = (values, { resetForm }) => {
        console.log(props.data);
        console.log(values.otp);
        if((props.data)==(values.otp)){   
             navigate("/forget")
        }else{
            toast.error("wrong OTP", {
                position: "top-center",
            });
        }

        resetForm();
    }

   

    const formik = useFormik({
        initialValues,
        validate,
        onSubmit
    })

    useEffect(() => {
        toast.success("Your OTP is send into your Email Successfully", {
            position: "top-center",
        });
    }, [])

    return (
        <>


            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">

                    {/* <h1 className="text-center text-2xl font-bold text-red-500 sm:text-3xl">
                        Password Conformation !!!
                    </h1> */}

                    <form onSubmit={formik.handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4  shadow-2xl sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium">Enter Your OTP</p>



                        {/* ******************************* */}
                        <div>
                            <label htmlFor="otp" className="sr-only">OTP</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    onChange={formik.handleChange}
                                    value={formik.values.otp}
                                    onBlur={formik.handleBlur}
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Your otp"
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
                                {formik.touched.otp && formik.errors.otp ? (<div className=" mr-[350px] text-red-500">{formik.errors.otp}</div>) : null}
                            </div>
                        </div>
                        {/* ************************ */}


                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">Submit</button>

                    </form>


                    <p className="text-center text-sm text-gray-500">

                        <Link className="underline" to="/login">login</Link>
                    </p>
                </div>

            </div>
            <Toaster />
        </>
    )
}

export default GetOtp;