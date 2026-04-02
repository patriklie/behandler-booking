import { useState, useEffect } from "react";
import Kalender from "../components/Kalender.jsx";
import OpprettTimeSkjema from "../components/OpprettTimeSkjema.jsx";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import toast from "react-hot-toast";

import { motion, AnimatePresence } from "motion/react";
import TimeListe from "../components/TimeListe.jsx";
import Skillelinje from "../components/Skillelinje.jsx";

const MineTimerPage = () => {

  const token = useAppStore((state) => state.token);
  const role = useAppStore((state) => state.role);
  const [behandlerTimer, setBehandlerTimer] = useState([]);
  const [valgtDato, setValgtDato] = useState(new Date().toISOString().split("T")[0]);  
  const timerValgtDato = behandlerTimer.filter(time => time.dato.startsWith(valgtDato));
  const [showSkjema, setShowSkjema] = useState(false);
  
  const formatDato = (datoString) => {
    const date = new Date(datoString);
    return new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
  }).format(date);
  };
    
  const hentBehandlerTimer = async () => {
      try {
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/time/behandlerTimer`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBehandlerTimer(response.data.foundAlleBehandlerTimer);
        
      } catch (error) {
        console.error(error.response?.data?.message);
      }
    }
    
  useEffect(() => {
    if (role !== "behandler") return;
    hentBehandlerTimer();
  }, [])
    
  
  const slettTime = async (time) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/time/${time._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      hentBehandlerTimer();
      toast.success(response.data.message)
    } catch (error) {
    toast.error(error.response?.data?.message || "Noe gikk galt ved sletting av time")
    }
  }
  
  return (
    <>

      { role === "behandler" &&
      <>
      <Skillelinje buttonColor={"var(--primary-color)"} buttonTextColor={"white"} tekst={showSkjema ? "Lukk" : "Opprett time"} onClick={() => setShowSkjema(!showSkjema)} />
      
      <AnimatePresence mode="popLayout">  
      {showSkjema && 

          <motion.div
          key="skjema"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          >
          
         <OpprettTimeSkjema hentBehandlerTimer={hentBehandlerTimer} />
        </motion.div>
      }

      </AnimatePresence>  
      </>
      }
      
      
      <motion.div layout>
      <Kalender timer={behandlerTimer} onDatoValg={setValgtDato} />
      </motion.div>
      
      <motion.div layout className="kalender-formatert-dato">
        {valgtDato ? formatDato(valgtDato) : "Ingen dato valgt"}
      </motion.div>
      
      <AnimatePresence>
      <motion.div layout="position" className="timer-container">
        
      <TimeListe timerValgtDato={timerValgtDato} slettTime={slettTime} />
      </motion.div>

</AnimatePresence>
      
    </>
  )
}

export default MineTimerPage