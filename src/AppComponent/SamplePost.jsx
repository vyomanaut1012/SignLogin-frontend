import save from "../assets/Images/save.svg"
import save1 from "../assets/Images/save1.svg"
import Axios from "axios"
import krishna from "../assets/Images/krishna.jpg"
import { useState } from "react";
const Card=(props)=>{
    let Title=props.title;
    let sep=Title.split(" ");
    let T=" ";
    let n=7;
    if(sep.length<6) n=sep.length;
    for(let i=0;i<n;i++){
         T=T+sep[i];
         T=T+" ";
    }
    // console.log(T);

    let Content=props.content;
    let go=Content.split(" ");
    let C=" ";
    let i=0
    for(i=0;i<8;i++){
        C=C + go[i];
        C=C + " ";
    }
   const [secure,setSecure]=useState(true);
   const saveHandler=()=>{
       setSecure(!secure);
   }
   
   const openHandler=async()=>{
      try{
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
   }   
    return(
        <>
        <div className=" mx-auto max-w-[400px] shadow-md shadow-gray-300 cursor-pointer py-2 px-2" onClick={openHandler} target="_blank">
               <div className="flex flex-row justify-between items-center">
                <div className=" flex flex-row text-[14px] items-center space-x-1 ml-1">
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
                    <p className=" text-left ">{props.date}</p>
               </div>
               <div onClick={saveHandler} className=" cursor-pointer">
                 { secure ? <img className=" w-[23px] h-auto mr-1 mt-1 mb-1" title="save this post" alt="" 
                src={save}/> :
                 <img className=" w-[23px] h-auto mr-1 mt-2 mb-1" title="save this post" alt="" 
                src={save1}/> }
               </div>
               </div>
           <div className="flex  flex-row mr-1 justify-between">
             <div>
               <div className=" max-w-[250px] text-left ml-1 ">
                <h1 className="text-md font-sans font-bold mt-2 ">
                  {T}
                </h1>
                <div>
                    <span className=" text-gray-600 text-sm">
                    {C}
                    </span>
                     <span>. . .</span>                   
                </div>
                <div className=" mt-1 mb-2">
                  <span className=" text-sm bg-gray-300 py-1 px-2 rounded-md font-mono">Web Devlopment</span>
                </div>                    
              </div>
            </div>
   
           <div className=" ">
                <img src={props.url}
                className=" w-[120px] h-[80px] border-[1px] border-solid  border-blue-300  mt-6"
                 alt=""/>
            </div>
            </div>
         </div>
    
        </>
    )
}
export default Card;