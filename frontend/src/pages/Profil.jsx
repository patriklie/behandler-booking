import { useProfile, useAppStore } from "../store/authStore.js";
import { useState, useRef } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { UserPen, Mail, Stethoscope, CircleChevronDown, LockKeyhole, Eye, EyeClosed, X, Info } from "lucide-react";
import ProfileCard from "../components/ProfileCard.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import SlettCharacter from "../assets/3d-female-character-with-question-marks.png";
import ProfileCharacter from "../assets/3d-female-character-waving.png";
import Skillelinje from "../components/Skillelinje.jsx";

const Profil = () => {
  
  const navigate = useNavigate();
  const { username, email, role, typeBehandler, omBehandler } = useProfile();
  const token = useAppStore((state) => state.token);
  const logout = useAppStore((state) => state.logout);
  const setProfil = useAppStore((state) => state.setProfil);
  const setProfilbilde = useAppStore((state) => state.setProfilbilde);
  const [nyProfil, setNyProfil] = useState({
    username: username,
    email: email,
    role: role,
    password: "",
    typeBehandler: typeBehandler,
    omBehandler: omBehandler,
  });
  const profilbilde = useAppStore((state) => state.profilbilde);
  const slettModalRef = useRef();
  const [visPassord, setVisPassord] = useState(false);
  const PassordIkon = visPassord ? Eye : EyeClosed;


  const profilbildeKlikk = async (e) => {
    console.log("Du klikket på profilbilde!");
    console.log(e)
    const nyttProfilbilde = (e.target.files[0]);
    const maxFileSize = 5 * 1024 * 1024;
    
    if (!nyttProfilbilde) {
      toast.error("Vennligst velg et bilde.");
      return;
    }
    
    if (nyttProfilbilde.size > maxFileSize) {
      toast.error("Bilde er for stort! Maks 5mb 👀");
      return;
    }
    
    const formData = new FormData();
    formData.append('profilbilde', nyttProfilbilde);
    
    try {

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/profilbilde`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      })
      
      setProfilbilde(response.data.profilbilde);
      toast.success("Endret profilbilde 👏");
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }

  const handleOppdaterBruker = (e) => {
    setNyProfil({ ...nyProfil, [e.target.name]: e.target.value })
  }

  const oppdaterProfil = async (e) => {
    e.preventDefault();
    
    const ingenEndringer = !nyProfil.password && 
        nyProfil.username === username && 
        nyProfil.email === email && 
        nyProfil.typeBehandler === typeBehandler &&
        nyProfil.omBehandler === omBehandler
    
    if (ingenEndringer) {
      toast("Ingen endringer å lagre 🕵🏻");
      return;
      }

    const payloadProfil = {
        username: nyProfil.username,
        email: nyProfil.email,
        typeBehandler: nyProfil.typeBehandler,
        omBehandler: nyProfil.omBehandler
    }

    if (nyProfil.password) {
      payloadProfil.password = nyProfil.password;
    }
    
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/`, payloadProfil, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      
      setProfil({
        username: response.data.username,
        email: response.data.email,
        role: response.data.role,
        typeBehandler: response.data.typeBehandler,
        omBehandler: response.data.omBehandler,
      })
      
      toast.success("Oppdatert profilen");
      setNyProfil(prev => ({ ...prev, password: "" }));
    
    } catch (error) {
      toast.error(error.response?.data?.message || "Noe gikk galt ved oppdatering")
  }
}

const slettProfil = async () => {
  try {

    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    slettModalRef.current.close()
    toast.success(response.data.message, { duration: 4000 });
    logout();
    navigate("/login");

  } catch(error) {
    toast.error(error.response?.data?.message)
  }
}
  
  return (
    <div className="margin-klassen">
    
    
    { role === "behandler" &&
    <>
    <div className="profil-forhåndsvisning"><span>Forhåndsvisning av profilen din </span></div>
    <ProfileCard profilbildeKlikk={profilbildeKlikk} username={username} email={email} role={role} typeBehandler={typeBehandler} profilbilde={profilbilde} omBehandler={omBehandler} />
    </>
      }
      
      {role === "pasient" &&
        <>
        <Skillelinje tekst="Min Profil" />
        <img src={ProfileCharacter} className="profile-character" />

        </>
      }
    
    
    <form onSubmit={oppdaterProfil} className="form-container"> 
      <div className="input-container">
        <UserPen className="input-icon" size={18} color="grey" strokeWidth={1.5} />
        <input type="text" value={nyProfil.username} name="username" onChange={handleOppdaterBruker} />
      </div>  
          
      <div className="input-container">
        <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
        <input type="text" value={nyProfil.email} name="email" onChange={handleOppdaterBruker} />
      </div>  

      <div className="input-container">
        <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
        <input type={ visPassord ? "text" : "password"} onChange={handleOppdaterBruker} value={nyProfil.password} id="password" name="password" placeholder="passord" />
        <PassordIkon className="input-icon-right" size={18} strokeWidth={1.5} onClick={() => setVisPassord(!visPassord)} />
      </div>
    
      {role === "behandler" &&
        <>
        <div className="input-container">
          <Stethoscope className="input-icon" size={18} color="grey" strokeWidth={1.5} />
          <select value={nyProfil.typeBehandler} className={nyProfil.typeBehandler ? "has-value" : ""} name="typeBehandler" onChange={handleOppdaterBruker}> 
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
        </div>
             
        <div className="input-container">
          <div className="textarea-limit">{nyProfil?.omBehandler?.length} / 170</div>
    {/*  <Info className="textarea-icon" size={18} fill="#FFFFFF" color="grey" strokeWidth={1.5} /> */}
          <textarea type="text" maxLength={170} rows={4} onChange={handleOppdaterBruker} value={nyProfil.omBehandler} id="omBehandler" name="omBehandler" placeholder="Om Behandler" />  
        </div>
          
      </>
      } 
        


        
    <motion.button
      layout="position"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 17 }}
      type="submit"
      className="logginn-btn">
      Oppdater profil
      <UserPen color="#FFFFFF" size={20} />
    </motion.button>  


    </form>

    <motion.button className="profil-slett-btn" onClick={() => slettModalRef.current.showModal()}>
      Slett profilen
    </motion.button>

    <dialog className="slett-profil-modal" ref={slettModalRef}>
      <img className="slett-profil-char" src={SlettCharacter} />
      <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }} 
      transition={{ type: "spring" }}
      className="slett-btn" 
      onClick={slettProfil}>Slett: <span>{username}</span></motion.button>
      <button  
      className="avbryt-btn" onClick={() => slettModalRef.current.close()}>Avbryt</button>
      <X 
      onClick={() => slettModalRef.current.close()} 
      className="lukk-modal" 
      
      />
    </dialog>

    </div>
  )
}

export default Profil