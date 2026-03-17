import { LogIn, AtSign, LockKeyhole, ArrowBigRight, Mail } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useAppStore } from "../store/authStore.js";
import { useNavigate, Link } from "react-router";


const LoginPage = () => {

  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const setToken = useAppStore((state) => state.setToken);
  const setUsername = useAppStore((state) => state.setUsername);
  const setEmail = useAppStore((state) => state.setEmail);
  const setRole = useAppStore((state) => state.setRole);
  const setAuth = useAppStore((state) => state.setIsAuth);
  const navigate = useNavigate();

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: epost,
      password: passord
      })

      console.log(response.data);

      setToken(response.data.token);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setRole(response.data.role);
      setAuth(true);
      navigate("/timer");

    } catch (error) {
      console.error(error.response.data);
}


  }

  return (
    <>
      <div>
      
        <form onSubmit={loginRequest} className="form-container" >
          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" onChange={(e) => setEpost(e.target.value)} value={epost} id="epost" placeholder="patrik@gmail.com" required></input>
          </div>
          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="password" onChange={(e) => setPassord(e.target.value)} value={passord} id="passord" placeholder="passord" required></input>
          </div>
          <div className="form-no-bruker">Har du ikke bruker? Registrer <Link to="/register">her</Link></div>
          <button type="submit" className="logginn-btn">Logg inn <ArrowBigRight fill="white" stroke="none" size={20} /></button>

      </form>
      </div>
    </>
  )
}

export default LoginPage