import { useProfile, useAppStore } from "../store/authStore.js";
import { useState } from "react";
import axios from "axios";
import { motion } from "motion/react";
import { UserPen, Mail, Stethoscope, CircleChevronDown } from "lucide-react";
import ProfileCard from "../components/ProfileCard.jsx";
import toast from "react-hot-toast";

const Profil = () => {
  
  const { username, email, role, typeBehandler } = useProfile();
  const token = useAppStore((state) => state.token);
  const setProfil = useAppStore((state) => state.setProfil);
  const setProfilbilde = useAppStore((state) => state.setProfilbilde);
  const [nyProfil, setNyProfil] = useState({
    username: username,
    email: email,
    role: role,
    typeBehandler: typeBehandler,
  });
  const profilbilde = useAppStore((state) => state.profilbilde);
  
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
    console.log(nyProfil);
    console.log(import.meta.env.VITE_API_URL);
    
    const erProfilEndret = nyProfil.username === username && nyProfil.email === email && nyProfil.typeBehandler === typeBehandler;
    
    if (erProfilEndret) {
      toast("Ingen endringer å lagre 🕵🏻");
      return;
}
    
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/`, nyProfil, {
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
      })
      
      toast.success("Oppdatert profilen")
    
    } catch (error) {
      console.log(error);
  }
}
  
  return (
    <div className="margin-klassen">
    <div className="profil-forhåndsvisning"><span>Forhåndsvisning av profilen din </span></div>
    <ProfileCard profilbildeKlikk={profilbildeKlikk} username={username} email={email} role={role} typeBehandler={typeBehandler} profilbilde={profilbilde} />
    
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
    </div>
  )
}

export default Profil