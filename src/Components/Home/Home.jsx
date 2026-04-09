import React from "react";
import { useNavigate } from "react-router-dom";
import AnimationBG from "../AnimationBG/AnimationBG.jsx";
import HomeNavbar from "../HomeNavbar/HomeNavbar.jsx";

export default function Home() {

   const navigate = useNavigate();
  return (
    <>

     
      <AnimationBG/>
       
      <HomeNavbar></HomeNavbar>


      <div className=" relative  text-center flex justify-center items-center  h-[80vh] ">

        <div >

           <h1 className=" text-6xl text-cyan-50">Decopia Security System </h1>
           <p className=" text-cyan-50 text-4xl mt-10">Smart Cybersecurity Monitoring and Deception Platform </p>

           <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-200 focus:outline-none  font-medium rounded-lg   text-base px-4 py-2 text-center cursor-pointer mt-10  me-5  w-32 "
            >
              Login
            </button>

            <button type="button" className="text-teal-500 hover:text-white border border-teal-500 hover:bg-teal-500  focus:outline-none font-medium rounded-lg text-base px-4 py-2 text-center w-32 me-2 mb-2 cursor-pointer
            
            
            
           ">Learn More </button>
        </div>
      </div>

      

      
    </>
  );
}
