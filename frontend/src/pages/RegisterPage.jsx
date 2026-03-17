import { Mail, LockKeyhole, ArrowBigRight, User, UserPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import { useNavigate } from "react-router";


const RegisterPage = () => {

  const setToken = useAppStore((state) => state.setToken);
  const navigate = useNavigate();

  const [nyBruker, setNyBruker] = useState({
    username: "",
    email: "",
    role: "pasient",
    password: "",
  })

  const registrerBruker = async (e) => {
    e.preventDefault();
    console.log(nyBruker);

    try {

      if (!nyBruker.username || !nyBruker.email || !nyBruker.role || !nyBruker.password) return;

      await axios.post("http://localhost:5000/api/auth/register", nyBruker);
      const loginRespons = await axios.post("http://localhost:5000/api/auth/login", {
        email: nyBruker.email,
        password: nyBruker.password,
      });
      setToken(loginRespons.data.token);
      navigate("/timer")

    } catch (error) {
      console.error(error.response.data.message);
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
            <input type="text" value={nyBruker.username} name="username" onChange={handleBruker} placeholder="brukernavn" required></input>
          </div>

          <div className="input-container">
            <Mail className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="text" value={nyBruker.email} name="email" onChange={handleBruker} placeholder="patrik@gmail.com" required></input>
          </div>

          <div className="input-container">
            <LockKeyhole className="input-icon" size={18} color="grey" strokeWidth={1.5} />
            <input type="password" value={nyBruker.password} name="password" onChange={handleBruker} placeholder="passord" required></input>
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

          <button type="submit" className="logginn-btn">Opprett konto<UserPlus color="#FFFFFF" size={20} /></button>

      </form>
      </div>
    </>
  )
}

export default RegisterPage