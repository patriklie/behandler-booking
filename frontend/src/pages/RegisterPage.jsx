import { Mail, LockKeyhole, ArrowBigRight, User, UserPlus, ChevronDown, Bone, Activity, Stethoscope, Brain, Leaf, Circle, Zap, Dumbbell, Apple, PersonStanding, Smile } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";

const RegisterPage = () => {

  const setToken = useAppStore((state) => state.setToken);
  const navigate = useNavigate();

  const [nyBruker, setNyBruker] = useState({
    username: "",
    email: "",
    role: "pasient",
    password: "",
    typeBehandler: ""
  })
  
  const behandlerIkoner = {
    kiropraktor: <Bone size={18} color="grey" strokeWidth={1.5} />,
    fysioterapeut: <PersonStanding size={18} color="grey" strokeWidth={1.5} />,
    lege: <Stethoscope size={18} color="grey" strokeWidth={1.5} />,
    tannlege: <Smile size={18} color="grey" strokeWidth={1.5} />,
    psykolog: <Brain size={18} color="grey" strokeWidth={1.5} />,
    naprapat: <Zap size={18} color="grey" strokeWidth={1.5} />,
    osteopat: <Leaf size={18} color="grey" strokeWidth={1.5} />,
    akupunktør: <Zap size={18} color="grey" strokeWidth={1.5} />,
    personligtrener: <Dumbbell size={18} color="grey" strokeWidth={1.5} />,
    ernæringsfysiolog: <Apple size={18} color="grey" strokeWidth={1.5} />,
  }
  
  const aktivtIkon = behandlerIkoner[nyBruker.typeBehandler] || <ChevronDown size={18} color="grey" strokeWidth={1.5} />;

  const registrerBruker = async (e) => {
    e.preventDefault();
    console.log(nyBruker);

    try {

      if (!nyBruker.username || !nyBruker.email || !nyBruker.role || !nyBruker.password) {
        toast.error("Alle felt må fylles ut.");
        return;
      } 
      
      if (nyBruker.role === "behandler" && !nyBruker.typeBehandler) {
        toast.error("Velg type behandler.")
        return;
      }
      
      const brukerData = { ...nyBruker };
      if (brukerData.role !== "behandler") {
        delete brukerData.typeBehandler;
      }
        
      await axios.post("http://localhost:5000/api/auth/register", brukerData);
      const loginRespons = await axios.post("http://localhost:5000/api/auth/login", {
        email: nyBruker.email,
        password: nyBruker.password,
      });
      console.log("Dette får jeg tilbake ved registrering: ", loginRespons)
      setToken(loginRespons.data.token);
      navigate("/profil")

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message)
    }

  }

  const handleBruker = (e) => {
    setNyBruker({ ...nyBruker, [e.target.name]: e.target.value })
  }

  return (
  <>
      <div>
      
        <form onSubmit={registrerBruker} className="form-container">

          <div className="input-container">
            <UserPlus className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" value={nyBruker.username} name="username" onChange={handleBruker} placeholder="brukernavn" required />
          </div>

          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" value={nyBruker.email} name="email" onChange={handleBruker} placeholder="patrik@hotmail.com" required />
          </div>

          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="password" value={nyBruker.password} name="password" onChange={handleBruker} placeholder="passord" required />
          </div>

          <div className="radio-container">
            <div>
              <input type="radio" checked={nyBruker.role === "pasient"} name="role" id="pasient" value="pasient" onChange={handleBruker} />
              <label htmlFor="pasient">Pasient</label>
            </div>
            <div>
              <input type="radio" checked={nyBruker.role === "behandler"} name="role" id="behandler" value="behandler" onChange={handleBruker} />
              <label htmlFor="behandler">Behandler</label>
            </div>
          </div>
          
<AnimatePresence mode="popLayout">
          { nyBruker.role === "behandler" && (
              <motion.div
                key="typeBehandler"
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="input-container">
              <div className="select-icon">{aktivtIkon}</div>
              <select style={{ paddingLeft: 20 }} className={nyBruker.typeBehandler ? "has-value" : ""} value={nyBruker.typeBehandler} name="typeBehandler" onChange={handleBruker} > 
                <option value="">Velg fagfelt</option>
                <option value="akupunktør">Akupunktør</option>
                <option value="ernæringsfysiolog">Ernæringsfysiolog</option>
                <option value="fysioterapeut">Fysioterapeut</option>
                <option value="kiropraktor">Kiropraktor</option>
                <option value="lege">Lege</option>
                <option value="naprapat">Naprapat</option>
                <option value="osteopat">Osteopat</option>
                <option value="personligtrener">Personlig trener</option>
                <option value="psykolog">Psykolog</option>
                <option value="tannlege">Tannlege</option>
              </select>
          </motion.div>
          )}

          <motion.button
            layout="position"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 17 }}
            type="submit"
            className="logginn-btn">
            Opprett konto
            <UserPlus color="#FFFFFF" size={20} />
          </motion.button>
            
</AnimatePresence>
      </form>
      </div>
    </>
  )
}

export default RegisterPage