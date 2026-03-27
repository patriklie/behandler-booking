import { useState, useEffect } from "react";
import Kalender from "../components/Kalender.jsx";
import OpprettTimeSkjema from "../components/OpprettTimeSkjema.jsx";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import toast from "react-hot-toast";

const MineTimerPage = () => {

  const token = useAppStore((state) => state.token);
  const [behandlerTimer, setBehandlerTimer] = useState([]);
  const [valgtDato, setValgtDato] = useState("");
  
  const timerValgtDato = behandlerTimer.filter(time => time.dato.startsWith(valgtDato))
  
  const formatDato = (datoString) => {
  const date = new Date(datoString);

  return new Intl.DateTimeFormat("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
  
  useEffect(() => {
   const hentBehandlerTimer = async () => {
    try {
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/time/behandlerTimer`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBehandlerTimer(response.data.foundAlleBehandlerTimer);
      
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }  
    hentBehandlerTimer();
  },[])
  
 
  
  return (
    <>
      <OpprettTimeSkjema />
      <Kalender onDatoValg={setValgtDato} />
      <div className="kalender-formatert-dato">
        {valgtDato ? formatDato(valgtDato) : "Ingen dato valgt"}
      </div>
      <button onClick={() => console.log(behandlerTimer)}>BehandlerTimer</button>
      <button onClick={() => console.log(valgtDato)}>ValgtDato</button>
      {
        timerValgtDato.map((time) => {
          return <div>StartTid: {time.startTid} Pris: {time.pris}</div>
        })
      }
    </>
  )
}

export default MineTimerPage