import Axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const ShowPost=()=>{
    // const Navigate=useNavigate();
    const [data,setdata]=useState([]);
    useEffect(()=>{
        const fetch=async(req,res)=>{
            try{
                const MyData= await Axios.get("https://posts-backend-two1.onrender.com/api/showapi");
                setdata(MyData.data[0]);
               
            }catch(err){
                console.log(err);
            }
        }
        fetch();
    },[])
    console.log("data", data);
   
    return(
         <div className="max-w-[90vw] mx-auto">
           
            <img src={data.url}
             className="w-[230px] h-[140px] sm:w-[290px] sm:h-[175px] md:w-[320px] md:h-[200px] md:mb-10 mx-auto my-8 lg:w-[750px] lg:h-[330px] "
             alt="" />

            <div className=" max-w-[750px] mx-auto leading-6">
            <div className="  flex flex-row mx-auto space-x-3"> 
                  <img src={data.url} alt=""
                     style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border:"1px solid #4B9CD3",
                    }}
                   /> 
                    <p className=" text-left font-semibold "> {data.name}</p>
            </div>
            <div className=" flex flex-row space-x-2">
                <p className=" text-left text-gray-600 text-[14px]">posted on</p>
                <p className=" text-left font-semibold text-gray-600 ">{data.date}</p>
            </div>
            </div>


        <div className=" max-w-[750px] mx-auto">
            <div className=" mb-8 font-bold text-start font-serif text-[19px] md:text-[21px] lg:text-[26px] lg:max-w-[55vw] mx-auto mt-5">
                {data.title}
            </div>
            <h2 className=" text-start text-[14px] md:text-[18px]  mx-auto font-serif lg:max-w-[55vw] text-gray-600 ">
                {data.content}
            </h2>

            <p class="text-end text-lg text-gray-500 my-8 font-semibold">
                 Enjoy your
                 <Link className="underline mx-1 mr-3" to="/totalpost">next post</Link>
            </p>
          </div>
         </div>
    )
}

export default ShowPost;