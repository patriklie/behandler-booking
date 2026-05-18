import { LockKeyhole, ArrowBigRight, Mail, Eye, EyeClosed } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppStore } from "../store/authStore.js";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";
import toast from "react-hot-toast";
import LoginPerson from "../assets/freepik__background__69816.webp";

const LoginPage = () => {

  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const setAuth = useAppStore((state) => state.setIsAuth);
  const setProfil = useAppStore((state) => state.setProfil);
  const navigate = useNavigate();
  const [visPassord, setVisPassord] = useState(false);
  const PassordIkon = visPassord ? Eye : EyeClosed;
  
  
  // et lite easter egg 🐣 i consollen for de som tester appen på skjermbredde over 1000px
  useEffect(() => {
    if (window.innerWidth > 1000) {
      console.log(`Hei! 👋 Jeg ser at du bruker appen med en bredde på ${window.innerWidth}px, anbefaler deg å teste den i 375px - 1000px bredde! 👀`);
      if (!window.matchMedia('(display-mode: standalone)').matches) {
        console.log("Du har ikke lagt den inn som en PWA, så test gjerne det å! 🤓")
      }
    };
  }, []);

  const loginRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email: epost,
      password: passord
      })

      toast.success(`Hei ${response.data.username} 👋`);
      
      setProfil(response.data)
      setAuth(true);
      navigate("/profil");

    } catch (error) {
      console.error(error?.response?.data);
      toast.error(error?.response?.data?.message || "Noe gikk galt, prøv igjen");
}


  }

  return (
    <>
      <div className="margin-klassen">
        
        <img src={LoginPerson} alt="login" className="login-person" />
        
        <form onSubmit={loginRequest} className="form-container" >
          
          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input className="login-epost-input" type="email" onChange={(e) => setEpost(e.target.value)} value={epost} id="epost" placeholder="din@epost.no" required />
          </div>
          
          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type={ visPassord ? "text" : "password"} onChange={(e) => setPassord(e.target.value)} value={passord} id="passord" placeholder="Passord" required />
            <PassordIkon className="input-icon-right" size={18} strokeWidth={1.5} onClick={() => setVisPassord(!visPassord)} />
          </div>
          <div className="form-no-bruker">Har du ikke bruker? Registrer <Link to="/register">her</Link></div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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