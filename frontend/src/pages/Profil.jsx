import { useProfile, useAppStore } from "../store/authStore.js";
import { useState } from "react";
import axios from "axios";

const Profil = () => {
  
  const { username, email, role, typeBehandler, profilbilde } = useProfile();
  const token = useAppStore((state) => state.token);
  const setProfil = useAppStore((state) => state.setProfil)
  
  const [nyProfil, setNyProfil] = useState({
    username: username,
    email: email,
    role: role,
    typeBehandler: typeBehandler,
    profilbilde: profilbilde,
  });
  
  const handleOppdaterBruker = (e) => {
    setNyProfil({ ...nyProfil, [e.target.name]: e.target.value })
    
  }
  
  const oppdaterProfil = async (e) => {
    e.preventDefault();
    console.log(nyProfil);
    console.log(import.meta.env.VITE_API_URL)
    
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
        profilbilde: response.data.profilbilde,
      })
    
    } catch (error) {
      console.log(error);
    }
    

  }
  
  return (
    <>
    <div>Brukernavn: {username}</div>
    <div>Epost: {email}</div>
    <div>Rolle: {role}</div>
    <div>Type behandler: {typeBehandler}</div>
    
    <form onSubmit={oppdaterProfil} className="form-container"> 
      <div className="input-container">
        <input type="text" value={nyProfil.username} name="username" onChange={handleOppdaterBruker} />
          <button>Send endringer</button>
      </div>
    </form>
    </>
  )
}

export default Profil