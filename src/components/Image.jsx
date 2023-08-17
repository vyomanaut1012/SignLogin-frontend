import { useState } from "react";
import Axios from "axios";
function Image(props){
const [selectImage,setSelectImage]= useState('');
const imageHandler=(event)=>{
    setSelectImage(event.target.files[0]);
}

const imageUpload=()=>{
    const formData=new FormData();
    formData.append("file",selectImage);
    formData.append("upload_preset","flc7znhd");

    Axios.post(
        "https://api.cloudinary.com/v1_1/ddyn2w9v5/image/upload",formData
    ).then((response)=>{
        // console.log(response);
        // console.log(response.data.url);
        props.imageurl(response.data.url);
    })

}
   return(
    <div>
    <input type="file" onChange={imageHandler}/>
    <button onClick={imageUpload}>submit</button>
   </div>
   )
}

export default Image;