import { useState, useEffect } from "react";
import Kalender from "../components/Kalender.jsx";
import OpprettTimeSkjema from "../components/OpprettTimeSkjema.jsx";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "motion/react";
import TimeListe from "../components/TimeListe.jsx";
import Skillelinje from "../components/Skillelinje.jsx";
import PasientTimeListe from "../components/PasientTimeListe.jsx";
import DrawerEndretime from "../components/DrawerEndretime.jsx";

const MineTimerPage = () => {

  const token = useAppStore((state) => state.token);
  const role = useAppStore((state) => state.role);
  const [behandlerTimer, setBehandlerTimer] = useState([]);
  const [valgtDato, setValgtDato] = useState(new Date().toISOString().split("T")[0]);  
  const timerValgtDato = behandlerTimer.filter(time => time.dato.startsWith(valgtDato));
  const [showSkjema, setShowSkjema] = useState(false);
  const [filter, setFilter] = useState("");
  const [pasientTimer, setPasientTimer] = useState([]);
  const idag = new Date();
  idag.setHours(0, 0, 0, 0);
  const [showTimeDrawer, setShowTimeDrawer] = useState(false);
  const [valgtEndreTime, setValgtEndreTime] = useState("");
  const [klinikker, setKlinikker] = useState([]);
  
  const hentMineKlinikker = async () => {
    try {
      
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/klinikk/mine`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setKlinikker(response.data)
      
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  }
  
  useEffect(() => {
    if (role !== "behandler") return;
    hentMineKlinikker();
  }, [])

  const kommende = pasientTimer.filter(time => {
    const dato = new Date(time.dato);
    dato.setHours(0, 0, 0, 0);
    return dato >= idag;
  });

  const tidligere = pasientTimer.filter(time => {
    const dato = new Date(time.dato);
    dato.setHours(0, 0, 0, 0);
    return dato < idag;
  });
  
  const filtrerteTimer = filter === "kommende" ? kommende : filter === "tidligere" ? tidligere : pasientTimer;
  
  const formatDato = (datoString) => {
    const date = new Date(datoString);
    return new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
  }).format(date);
  };
  
  const avlysTime = async (timeID) => {
    try {
      
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/time/${timeID}/avlys`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      hentPasientTimer()
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Noe gikk galt ved avlysing av timen")
    }
  
  }
  
  const hentPasientTimer = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/time/pasienttimer`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasientTimer(response.data.mineTimer);
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Noe gikk galt ved henting av pasienttimer")
    }
  }
  
  useEffect(() => {
    if (role !== "pasient") return
    hentPasientTimer();    
  },[])
    
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
      console.log("Slettet, henter timer på nytt...");
      await hentBehandlerTimer();
      console.log("behandlerTimer etter sletting:", behandlerTimer);
      toast.success(response.data.message)
    } catch (error) {
    toast.error(error.response?.data?.message || "Noe gikk galt ved sletting av time")
    }
  }
  
  const onBehandlerTimeKlikk = (time) => {
    console.log("Åpner timen for redigering");
    console.log(time)
    setShowTimeDrawer(true);
    setValgtEndreTime(time);
  }
  
  const closeBehandlerTime = () => {
    console.log("Stenger vindu")
    setShowTimeDrawer(false);
    setValgtEndreTime("");
  }
  
  return (
    <>

      { role === "behandler" &&
      <>
      <Skillelinje buttonColor={"var(--primary-color)"} buttonTextColor={"white"} tekst={showSkjema ? "Lukk" : "Opprett time"} onClick={() => setShowSkjema(!showSkjema)} />
      
      <AnimatePresence mode="popLayout">  
      {showSkjema && 

          <motion.div layout
          className="opprett-time-skjema"
          key="skjema"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          >
          
          <OpprettTimeSkjema hentBehandlerTimer={hentBehandlerTimer} mineKlinikker={klinikker} />
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
        
        <TimeListe timerValgtDato={timerValgtDato} slettTime={slettTime} onBehandlerTimeKlikk={onBehandlerTimeKlikk} musepeker={true} />
      </motion.div>

      </AnimatePresence>
      
        {showTimeDrawer &&
          <DrawerEndretime time={valgtEndreTime} closeBehandlerTime={closeBehandlerTime} hentBehandlerTimer={hentBehandlerTimer} slettTime={slettTime} />
        }
        
      </>
      }

     
      {pasientTimer && role === "pasient" &&
        <>

        <Skillelinje tekst="Mine Timer" />
        <div className="filter-container">
          
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 5px 10px rgba(0,0,0,0.1)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            className={`filter-btn alle ${filter === "" ? "active" : ""}`}
            onClick={() => setFilter("")}
          >Alle</motion.div>
          
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 5px 10px rgba(0,0,0,0.1)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            className={`filter-btn tidligere ${filter === "tidligere" ? "active" : ""}`}
              onClick={() => setFilter("tidligere")}
            >
            Tidligere</motion.div>
          
            <motion.div
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 5px 10px rgba(0,0,0,0.1)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            className={`filter-btn kommende ${filter === "kommende" ? "active" : ""}`}
              onClick={() => setFilter("kommende")}
            >
            Kommende</motion.div>
          
          </div>
        
        <PasientTimeListe timer={filtrerteTimer} avlysTime={avlysTime} />
        </>
      }

      
    
    </>
  )
}

export default MineTimerPage