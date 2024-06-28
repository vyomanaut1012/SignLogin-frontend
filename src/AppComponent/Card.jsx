import save from "../assets/Images/save.svg"
import save1 from "../assets/Images/save1.svg"
import Axios from "axios"
// import { useNavigate } from "react-router-dom";
// import ShowPost from "./ShowPost";
import krishna from "../assets/Images/krishna.jpg"
import { useState } from "react";
const Card=(props)=>{
    let width=window.innerWidth;
    let check=false;
    if(width>620) check=true;
    
    let Title=props.title;
    let sep=Title.split(" ");
    let T=" ";
    let n=7;
    if(sep.length<7) n=sep.length;
    for(let i=0;i<n;i++){
         T=T+sep[i];
         T=T+" ";
    }
    if(width>530) T=Title;
    console.log(T);

    let Content=props.content;
    let go=Content.split(" ");
    let C=" ";
    let C1=" ";
    let i=0
    for(i=0;i<11;i++){
        C=C + go[i];
        C=C + " ";
    }
    while(i<22){
        C1=C1+go[i];
        C1=C1+ " ";
        i++;
    }
   const [secure,setSecure]=useState(true);
   const saveHandler=()=>{
       setSecure(!secure);
   }
   
  //  const Navigate=useNavigate();
   const openHandler=async()=>{
    // Navigate("/showpost");
    // window.open("http://localhost:3000/showpost", "_blank");
    // console.log(props.email);
    // console.log("hello bro");
      try{
        // window.open("http://localhost:3000/showpost");
        await Axios.post("https://posts-backend-two1.onrender.com/api/showpost",{
          email:props.email,
          name:props.name,
          url:props.url,
          title:props.title,
          content:props.content,
          tag:props.tag,
          date:props.date
      });
   
      }catch(err){
        console.log(err);
      }
      
      // console.log("showpost");    
   }   
    return(
        <>
        <div className=" mx-auto max-w-[700px] shadow-md shadow-gray-300 cursor-pointer py-6" onClick={openHandler}>
               <div className="flex flex-row justify-between items-center">
                <div className=" flex flex-row text-[14px] lg:text-[15px] items-center space-x-1 mt-2 ml-1 lg:space-x-2 lg:font-serif">
                    <img src={krishna} alt=""
                     style={{
                        width: "26px",
                        height: "26px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border:"1px solid #4B9CD3",
                    }}
                    
                    />
                    <p className=" text-left  "> {props.name}</p>
                    <p className=" text-left text-gray-600 text-[13px]">posted on</p>
                    <p className=" text-left "> {props.date}</p>
               </div>
               <div onClick={saveHandler} className=" cursor-pointer">
                 { secure ? <img className=" w-[23px] lg:w-[26px] h-auto mr-1 mt-2 mb-1 lg:mr-3" title="save this post" alt="" 
                src={save}/> :
                 <img className=" w-[23px] lg:w-[26px] h-auto mr-1 mt-2 mb-1 lg:mr-3" title="save this post" alt="" 
                src={save1}/> }
               </div>
               </div>
           <div className="flex  flex-row mr-1 justify-between">
             <div>
               <div className=" max-w-[200px] sm:max-w-[300px] lg:max-w-[500px] text-left ml-1 ">
                <h1 className="text-md font-sans font-bold mt-2 lg:text-lg">
                  {T}
                </h1>
                <div>
                    <span className=" text-gray-600 text-sm lg:text-[16px]  lg:text-gray-500">
                       {C} 
                    </span>
                    { check && props.available ? (<span className=" text-gray-600 text-sm lg:text-[16px] lg:text-gray-500">
                       {C1} . . .
                    </span>) : null}
                    {
                      !check ? <span>. . .</span> : null 
                    }
                </div>
                <div className=" mt-3 lg:mt-6 mb-4">
                  <span className=" text-sm bg-gray-300 py-1 px-2 rounded-md lg:text-[14.5px] font-mono">{props.tag}</span>
                </div>                    
              </div>
            </div>
   
           <div className=" ">
                <img src={props.url}
                className=" w-[100px] h-[70px] border-[1px] border-solid  border-blue-300 md:w-[150px] md:h-[110px] lg:w-[160px] lg:h-[115px] mt-10 md:mt-0 lg:mr-3"
                 alt=""/>
            </div>
            </div>
         </div>
    
        </>
    )
}
export default Card;