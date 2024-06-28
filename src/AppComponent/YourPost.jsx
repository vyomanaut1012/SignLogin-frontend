import Axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const YourPost = ()=>{
    const email=cookies.get("email");
    const Email=email+"@gmail.com";
    const [Data, setData]=useState([]);
     useEffect(()=>{
        const fetch=async()=>{
            try{
               const fetchData= await Axios.get("https://posts-backend-two1.onrender.com/api/postapi");
               const myArray=[];
               for(let i=0;i<fetchData.data.length;i++){
                  if(fetchData.data[i].email===Email){
                      myArray.push(fetchData.data[i].post);
                      break;
                  }
               }
               setData(myArray[0]);
    
            }catch(err){
                console.log(err);
            }
        }
        fetch();
     },[])
     return(
        <>
           <Navbar className="fixed top-0 z-10"/>
           <div className=" mx-auto grid-cols-1 space-y-8 z-0">
            {
                Data.map(data=>{
                    return <Card email={data.email} name={data.name}
                                 url={data.url} title={data.title} 
                                 content={data.content} tag={data.tag}
                                 date={data.date}
                          />
                })
            }
        </div>
        </>
     )
}

export default YourPost;