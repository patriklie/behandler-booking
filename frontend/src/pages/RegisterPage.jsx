import { Mail, Eye, EyeClosed, LockKeyhole, UserPlus, ChevronDown, Bone, Stethoscope, Brain, Leaf, Zap, Dumbbell, Apple, PersonStanding, Smile, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import toast from "react-hot-toast";
import RegisterPerson from "../assets/3d-female-character-working-laptop-while-sitting-chair.webp";

const RegisterPage = () => {
  const [visPassord, setVisPassord] = useState(false);
  const setToken = useAppStore((state) => state.setToken);
  const navigate = useNavigate();
  const PassordIkon = visPassord ? Eye : EyeClosed;
  const [ledigBrukernavn, setLedigBrukernavn] = useState(null);
  const [sjekkerBrukernavn, setSjekkerBrukernavn] = useState(false);
  
  const [nyBruker, setNyBruker] = useState({
    username: "",
    email: "",
    role: "pasient",
    password: "",
    typeBehandler: ""
  });
  
  useEffect(() => {
    if (!nyBruker.username) {
      setLedigBrukernavn(null);
      setSjekkerBrukernavn(false);
      return;
    }

    setLedigBrukernavn(null);
    setSjekkerBrukernavn(true);

    const timeout = setTimeout(async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/sjekk/brukernavn?username=${nyBruker.username}`
      );

      setLedigBrukernavn(response.data.ledig);
      setSjekkerBrukernavn(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [nyBruker.username]);
  
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
        
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, brukerData);
      const loginRespons = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email: nyBruker.email,
        password: nyBruker.password,
      });
      setToken(loginRespons.data.token);
      navigate("/profil")

    } catch (error) {
      toast.error(error.response.data.message);
    }

  }

  const handleBruker = (e) => {
    setNyBruker({ ...nyBruker, [e.target.name]: e.target.value })
  }

  return (
  <>
      <div className="margin-klassen">
        <img src={RegisterPerson} alt="login" className="login-person" />
        

        <form onSubmit={registrerBruker} className="form-container">

          <div className="input-container">
            <UserPlus className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" value={nyBruker.username} name="username" onChange={handleBruker} placeholder="Fornavn Etternavn" required />
            <AnimatePresence mode="wait">
              {nyBruker.username && !sjekkerBrukernavn && (
                ledigBrukernavn ? (
                  <motion.div
                    key="ledig"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <CheckCircle2 className="input-icon-right brukernavn-ledig" size={24} strokeWidth={1.2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="opptatt"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                      <XCircle className="input-icon-right brukernavn-opptatt" size={24} strokeWidth={1.2}  />
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input className="registrer-epost-input" type="email" value={nyBruker.email} name="email" onChange={handleBruker} placeholder="din@epost.no" required />
          </div>

          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type={visPassord ? "text": "password"} value={nyBruker.password} name="password" onChange={handleBruker} placeholder="Passord" required />
            <PassordIkon className="input-icon-right" size={18} strokeWidth={1.5} onClick={() => setVisPassord(!visPassord)} />
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
              whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 17 }}
            type="submit"
            className="logginn-btn"
            style={{ marginTop:  nyBruker.role === "behandler" ? "10px" : 0 }}
            >
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