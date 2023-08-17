import React from "react";
import Image from "./Image";
import { useState } from 'react';
function Show(){
  const [url,seturl]=useState(' ');
  function imageurl(data){
    seturl(data);
  } 
    return(
      <>
      <img className=" mx-auto" style={{width:200}} src={url} alt=""/>       
      <Image imageurl={imageurl}/> 
      <div className=" items-center">
          <h1 className="text-3xl text-blue-500  font-bold">Hello everyone</h1>
          <h2  className="text-2xl text-teal-700 font-bold shadow-lg">Welcome to new page</h2>
      </div>
      </>
    )
}

export default Show;