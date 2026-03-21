import { LockKeyhole, ArrowBigRight, Mail } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { useAppStore } from "../store/authStore.js";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import toast from "react-hot-toast";

const LoginPage = () => {

  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const setToken = useAppStore((state) => state.setToken);
  const setUsername = useAppStore((state) => state.setUsername);
  const setEmail = useAppStore((state) => state.setEmail);
  const setRole = useAppStore((state) => state.setRole);
  const setAuth = useAppStore((state) => state.setIsAuth);
  const setTypeBehandler = useAppStore((state) => state.setTypeBehandler);
  const setProfilbilde = useAppStore((state) => state.setProfilbilde);
  const navigate = useNavigate();

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
      email: epost,
      password: passord
      })

      console.log("Dette får jeg tilbake ved login: ", response);
      toast.success(`Hei ${response.data.username} 👋`);
      
      setToken(response.data.token);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setRole(response.data.role);
      setProfilbilde(response.data.profilbilde);
      setAuth(true);
      setTypeBehandler(response.data.typeBehandler || "");
      navigate("/timer");

    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message);
}


  }

  return (
    <>
      <div>
      
        <form onSubmit={loginRequest} className="form-container" >
          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" onChange={(e) => setEpost(e.target.value)} value={epost} id="epost" placeholder="patrik@gmail.com" required />
          </div>
          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="password" onChange={(e) => setPassord(e.target.value)} value={passord} id="passord" placeholder="passord" required />
          </div>
          <div className="form-no-bruker">Har du ikke bruker? Registrer <Link to="/register">her</Link></div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 17 }}
            type="submit"
            className="logginn-btn">
            Logg inn <ArrowBigRight fill="white" stroke="none" size={20} />
          </motion.button>

      </form>
      </div>
    </>
  )
}

export default LoginPage