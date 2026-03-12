import { LogIn } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useAppStore } from "../store/authStore.js";


const LoginPage = () => {

  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const setToken = useAppStore((state) => state.setToken)
  const setUsername = useAppStore((state) => state.setUsername)

  const brukernavnHandler = (e) => {
    setEpost(e.target.value);
  }

  const passordHandler = (e) => {
    setPassord(e.target.value);
  }

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: epost,
      password: passord
      })

      console.log(response.data);

      setToken(response.data.token);
      setUsername(response.data.username)

    } catch (error) {
      console.error(error.response.data);
}


  }

  const inputClass = "max-w-[400px] bg-gray-50 px-4 py-2 my-2 w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent"

  return (
    <>
      <div className="text-center pt-4">LoginPage</div>
      
      <form onSubmit={loginRequest}  className="flex flex-col items-center p-2">
        <input onChange={brukernavnHandler} className={inputClass} placeholder="Brukernavn eller epost"></input>
        <input onChange={passordHandler} className={inputClass} placeholder="Passord"></input>
        <button type="submit" className="font-bold hover:scale-[1.02] transition tracking-wide flex items-center gap-1 bg-amber-300 px-10 py-1 rounded-3xl cursor-pointer">
          <span>Submit</span>
          <LogIn size={40} strokeWidth={1} />
        </button>

      </form>
    </>
  )
}

export default LoginPage