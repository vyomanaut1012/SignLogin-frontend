import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import {Link} from "react-router-dom"
import Axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import pro from "../assets/Images/bgp1.png"
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function Navbar(props) {
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	const [url,seturl]=useState(' ');
    const email=cookies.get("email");
    const Email=email + "@gmail.com";
    Axios.post("https://posts-backend-two1.onrender.com/api/userdata",{
        email:Email,
    }).then((response)=>{
        seturl(response.data.url);
    });
    
    const Navigate=useNavigate();
    const imageHandler=()=>{
        Navigate("/profile");
    }
    const goLink=()=>{
        Navigate("/login"); 
    }
	return (
		<header className=" text-[18px] text-white font-semibold bg-gradient-to-r from-yellow-500 overflow-hidden to-yellow-300 max-w-[100vw] px-5 mx-auto shadow-sm sticky top-0 py-10 lg:py-12">
		   <div className=" flex flex-row items-center space-x-4">
			
			<img
			  className=" w-[55px] h-[55px]  ml-1 md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] "
              style={{
                 borderRadius: "50%",
                 objectFit: "cover",
                 border:"1px solid #4B9CD3",
             }}
             src={url===' ' || url=== undefined ? pro : url}
             alt=""
             onClick={imageHandler}
            />
			<nav ref={navRef} className=" " >
				<Link className=" text-black" to="/totalpost">Home</Link>
				<Link className=" text-black" to="/createpost">Create your Post</Link>
				<Link className=" text-black" to="/yourpost">Your Posts</Link>
				<Link className=" text-black" to="/likedpost">Liked posts</Link>
				<Link  href="/login" className=" md:invisible lg:w-0">Login</Link>
				<button
					className="nav-btn nav-close-btn mr-4 lg:w-0 lg:mr-0 "
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button className=" text-white  bg-yellow-500 px-4 py-2 rounded-md hover:bg-cyan-700 invisible lg:visible"
			 onClick={goLink}>
			 Login
			</button>

			
            </div>
			<div className=" flex flex-row items-center justify-end space-x-3">
            <Link to="/totalpost" className=" text-black text-xl lg:text-[28px] font-sans">Freedom</Link>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars className=" w-5"/>
			</button>
			</div>
		</header>
	);
}

export default Navbar;