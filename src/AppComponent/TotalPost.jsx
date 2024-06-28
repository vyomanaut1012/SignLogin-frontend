// import Posts from "./Posts"
import Navbar from "./Navbar";
import Card from "./Card"
import Axios from "axios";
import { Link } from "react-router-dom";
import SamplePost from "./SamplePost"
import { useState, useEffect } from "react";
const TotalPost=()=>{
    let width=window.innerWidth;
    let check=false;
    if(width>926) check=true;
    const [Data, setData]=useState([]);
    const [Sample, setSample]=useState([]);
    useEffect(()=>{
        const fetched=async()=>{
        try{          
          const cardData=await Axios.get("https://posts-backend-two1.onrender.com/api/postapi");
          const myArray=[];
          const sample=[];
          for(let i=0;i<cardData.data.length;i++){
             for(let j=0;j<cardData.data[i].post.length;j++){
              const email = cardData.data[i].email;
              const name = cardData.data[i].name;
              const post = cardData.data[i].post[j];
              myArray.push({ email, name, ...post });
             }
          }
          for(let i=0;i<cardData.data.length;i++){
            for(let j=0;j<2;j++){
             const email = cardData.data[i].email;
             const name = cardData.data[i].name;
             const post = cardData.data[i].post[j];
             sample.push({ email, name, ...post });
            }
         }

     
          setSample(sample);
          setData(myArray);
          // console.log(myArray);
        }catch(err){
          console.log(err);
        }
    }
    fetched();
  },[]);
  
 return(
      <div className=" bg-neutral-50">
        <Navbar className="top-0 z-10 " />
      <div className=" z-0 flex flex-row ">  
        <div className=" mx-auto grid-cols-1 lg:space-y-20 lg:shadow-md lg:px-20">
            {
                
                Data.map(data=>{
                    return <Link to="/showpost"> 
                      <Card email={data.email} name={data.name}
                                 url={data.url} title={data.title} 
                                 content={data.content} tag={data.tag}
                                 date={data.date}
                          />
                       </Link>
                })
            }
        </div>
        { check ?
        <div className="top-12 lg:w-[600px] ">
             <div className=" bg-[#ffc017] px-8 py-20">
              <h3 className=" text-[80px] text-center font-semibold ">Stay Curious</h3>
              <p className=" text-[28px] text-center max-w-[400px] mx-auto mt-8 font-semibold font-mono">
                Discover stories, thinking, and expertise from writers on any topic.</p>
              </div>
              <div className=" text-start mx-auto shadow-md mt-[50px] lg:w-[350px] font-semibold py-8 px-8 bg-[#c4e2ff] leading-7 pr-[150px]" >
                <h2 className=" font-bold mb-6"> writing on Freedom</h2>
                <p> New Writer FAQ</p>
                <p> Expert Writing Advice</p>
                <p className=" mb-6">Grow your readership</p>
                <Link className=" text-sm py-2 px-3 text-white rounded-2xl bg-black" to="/createpost">Start Writing</Link>
              </div>
              <div className=" text-start mt-14 max-w-[360px] mx-auto ">
                 <h2 className=" font-semibold">Recommended Topics</h2>
                <div className=" flex flex-wrap max-w-[250px] text-[14px] mt-4"> 
                 <span className=" bg-gray-200 px-2 py-1 rounded-2xl mr-4 mb-3 ">Relationship</span>
                 <span className=" bg-gray-200 px-2 py-1 rounded-2xl mr-4 mb-3">Politics</span>
                 <span className=" bg-gray-200 px-2 py-1 rounded-2xl mr-4 mb-3">cryptoCurrency</span>
                 <span className=" bg-gray-200 px-2 py-1 rounded-2xl mr-4 mb-3">pyschology</span>
                 <span className=" bg-gray-200 px-2 py-1 rounded-2xl mr-4 mb-3">web development</span>
                </div>
             </div>
             <h2 className=" text-start font-semibold max-w-[360px] mx-auto mt-[60px]">Most Recommended Articles</h2>
            <div className=" mx-auto grid-cols-1 max-w-[350px] space-y-10 mt-[40px] ">
            {
                Sample.map(data=>{
                    return <Link to="/showpost">
                            <SamplePost email={data.email} name={data.name}
                                 url={data.url} title={data.title} 
                                 content={data.content} tag={data.tag}
                                 date={data.date}
                          />
                          </Link>
                })
            }
            </div>      
        </div>
          : null
        }
        </div>
        </div>
    )
}
export default TotalPost 