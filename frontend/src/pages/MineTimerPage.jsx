import { useState, useEffect } from "react";
import Kalender from "../components/Kalender.jsx";
import OpprettTimeSkjema from "../components/OpprettTimeSkjema.jsx";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import toast from "react-hot-toast";
import { Clock, Info, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MineTimerPage = () => {

const token = useAppStore((state) => state.token);
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
      toast.error(error.response?.data?.message);
    }
  }  
  
  useEffect(() => {
    hentBehandlerTimer();
  },[])
  
 
  
  return (
    <>

      
      <div className="ny-time-knapp-container">
        <div></div>
        <button onClick={() => setShowSkjema(!showSkjema)}>{ showSkjema ? "Lukk" : "Åpne ny time skjema" }</button> 
        <div></div>
      </div>
      
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
      
      <motion.div layout>
      <Kalender timer={behandlerTimer} onDatoValg={setValgtDato} />
      </motion.div>
      
      
      <motion.div layout className="kalender-formatert-dato">
        {valgtDato ? formatDato(valgtDato) : "Ingen dato valgt"}
      </motion.div>
      
      <AnimatePresence>
      <motion.div layout="position" className="timer-container">
        
      {
        timerValgtDato.map((time) => {
          return (
          <div key={time._id} className="time-celle">
            <div className="time-top-flex"> 
              <div className="time-flex"><Clock size={12} color="#444444" /> <span>{time.startTid}</span>-<span>{time.sluttTid}</span></div>
              <div className="time-flex"><Info size={12} color="#444444" /> <span>{time.status}</span></div>
            </div>
            <div className="time-top-flex"> 
              <div className="time-flex"><Wallet size={12} color="#444444" /> <span>{time.pris}kr</span></div>
              <div className="time-flex delete"><span>Slett time</span></div>
            </div>
          </div>
          )
        })
      }
      </motion.div>

</AnimatePresence>
      
    </>
  )
}

export default MineTimerPage