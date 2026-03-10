import axios from "axios";
import react from "react";
import { useState, useEffect } from "react";

export default function App() {


  const getUserInfo = async () => {
    const response = await axios.get("http://localhost:5000/api/auth/me", {
      headers: {
        Authorization: `Bearer `
      }
    })
    
    console.log(response.data);
}

  return (
    <>
      
      
      <div className="w-full bg-slate-200 flex justify-between p-3 ">
        <div>Behandler Booking</div>
        <div className="flex ">
          <div className="font-inter font-bold">Logg inn</div>
          <div className="ml-3">Registrer</div>
        </div>
      </div>
    <div className="font-inter font-bold tracking-wide text-xl flex justify-center items-center w-full max-w-[400px] mx-auto bg-white my-10 p-10 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-300 ease-in-out hover:scale-105">
        <div>Behandling Booker</div>
      </div>
      <button className="bg-blue-400" onClick={getUserInfo}>Hent bruker info</button>
    </>
  )
}