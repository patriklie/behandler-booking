import ProfileCard from "../components/ProfileCard.jsx";
import { useAppStore } from "../store/authStore.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";
import Kalender from "../components/Kalender.jsx";
import TimeListe from "../components/TimeListe.jsx";
import { motion, AnimatePresence } from "motion/react";
import Skillelinje from "../components/Skillelinje.jsx";

const BookTimePage = () => {
  const token = useAppStore((state) => state.token);
  const role = useAppStore((state) => state.role);
  const [valgtBehandler, setValgtBehandler] = useState(null);
  const [alleBehandlere, setAlleBehandlere] = useState([]);
  const [valgtBehandlerTimer, setValgtBehandlerTimer] = useState([]);
  const swiperRef = useRef(null);
  const [valgtDato, setValgtDato] = useState(new Date().toISOString().split("T")[0]);
  const timerValgtDato = valgtBehandlerTimer.filter(time => time.dato.startsWith(valgtDato));
  const [valgtTime, setValgtTime] = useState(null);
  const dialogRef = useRef();
  const [valgtBehandlerType, setValgtBehandlerType] = useState("Alle");
  const typer = [...new Set(alleBehandlere.map((behandler) => behandler.typeBehandler))].sort((a, b) => a.localeCompare(b, "no")); // rein sortering og fjernet "alle" legger til under
  const unikeBehandlerTyper = ["Alle", ...typer];
  const behandlereFiltrert = valgtBehandlerType === "Alle" ? alleBehandlere : alleBehandlere.filter((b) => b.typeBehandler === valgtBehandlerType)

  const handleTimeValg = (time) => {
    setValgtTime(time);
    dialogRef.current.showModal();
  }
  
  const bookTime = async () => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/time/${valgtTime._id}/book`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      hentValgtBehandlerTimer();
      hentAlleBehandlere(); // løftet ut av useEffect, blir et ekstra API kall men da er det oppdatert fra backend.
      setValgtTime(null);
      dialogRef.current.close();
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message || "Feil ved booking av time.")
    }
  }
  
  const avbrytBooking = () => {
    setValgtTime(null);
    dialogRef.current.close();
  }
  
  const formatDato = (datoString) => {
    const date = new Date(datoString);
    return new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };
  
  const formatDatoUtenYear = (datoString) => {
    const date = new Date(datoString);
    return new Intl.DateTimeFormat("no-NO", {
      day: "numeric",
      month: "long",
    }).format(date);
  };
  
  const hentValgtBehandlerTimer = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/time/behandler/${valgtBehandler._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setValgtBehandlerTimer(response.data.valgtBehandlerTimer)

    } catch (error) {
      toast.error(error.response?.data?.message || "Feil ved henting av valgt behandler timer.")
    }

  }
  
  useEffect(() => {
    if (!valgtBehandler) {
      setValgtBehandlerTimer([]);
      return;
    }
    hentValgtBehandlerTimer();
  }, [valgtBehandler])
  
  useEffect(() => {
  if (!swiperRef.current) return;

  if (valgtBehandler) {
    swiperRef.current.allowTouchMove = false;
    swiperRef.current.allowSlideNext = false;
    swiperRef.current.allowSlidePrev = false;
  } else {
    swiperRef.current.allowTouchMove = true;
    swiperRef.current.allowSlideNext = true;
    swiperRef.current.allowSlidePrev = true;
  }
}, [valgtBehandler]);
  
  const hentAlleBehandlere = async () => {

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/behandlere`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setAlleBehandlere(response.data.alleBehandlere)
      console.log("Her er alle behandleren: ", response.data.alleBehandlere)
    } catch (error) {
      toast.error(error.response?.data?.message || "Feil ved henting av behandlere.")
    }
  }
  
  useEffect(() => {
    hentAlleBehandlere();
  },[])
  
  return (
      
  <>
    
      <Skillelinje tekst={valgtBehandler ? "Valgt behandler" : "Velg behandler"} />
      <div className="behandler-filter-container">
      {unikeBehandlerTyper.map((b) => {
        return <motion.button whileHover={{
          scale: 1.1,
          boxShadow: "0px 5px 10px rgba(0,0,0,0.1)"
        }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 10
          }} key={b} onClick={() => setValgtBehandlerType(b)} className={`type-behandler-btn ${valgtBehandlerType === b ? "aktiv-behandler-btn" : ""}`}>{b}</motion.button>
      })
        }
      </div>
    <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ padding: "0 16px 24px 16px" }}
        spaceBetween={50}
        slidesPerView={1}
        className={`mySwiper ${valgtBehandler ? "locked" : ""}`}
        pagination={{ clickable: true }}
        modules={[ Pagination ]}
      >
        {
          behandlereFiltrert.map((behandler) => {
            return <SwiperSlide key={behandler._id}><ProfileCard cursorEnabled={true} velgbehandler={() => setValgtBehandler((prev) => { return prev?._id === behandler._id ? null : behandler })} valgt={behandler._id === valgtBehandler?._id} username={behandler.username} email={behandler.email} role={behandler.role} typeBehandler={behandler.typeBehandler} profilbilde={behandler.profilbilde} nesteTime={behandler.nesteTilgjengeligeTime} formaterDato={formatDatoUtenYear} visTilgjengelighet={true} omBehandler={behandler.omBehandler} /></SwiperSlide>
          })
        }
      </Swiper>
      <AnimatePresence mode="popLayout" >  
      {valgtBehandler && (
        <motion.div key="kalender-wrapper" layout>
          <motion.div layout>
            <Kalender timer={valgtBehandlerTimer} onDatoValg={setValgtDato} />
          </motion.div>
            
          <motion.div layout className="kalender-formatert-dato">
            {valgtDato ? formatDato(valgtDato) : "Ingen dato valgt"}
          </motion.div>
            
          <motion.div layout="position" className="timer-container">
              <TimeListe timerValgtDato={timerValgtDato} onTimeKlikk={handleTimeValg} />
          </motion.div>
            
        </motion.div>
        )}
      </AnimatePresence > 
      
      <dialog className="time-booking-modal" ref={dialogRef}>
        <div className="bilde-flex dotsdots">
          <motion.div
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.2)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            className="logo"></motion.div>
          <motion.div
            className="behandler-bilde"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.2)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            style={{ backgroundImage: `url(${valgtBehandler?.profilbilde})` }}></motion.div>
        </div>
        
        <div className="time-booking-overskrift">Godkjenn timevalget</div>
        <div className="time-booking-tekst">{valgtTime?.dato && formatDato(valgtTime.dato)} hos {valgtBehandler?.typeBehandler} {valgtBehandler?.username}. Timen er fra {valgtTime?.startTid} til {valgtTime?.sluttTid} og koster {valgtTime?.pris}kr.</div>
        
        {role === "pasient" ? 
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 15px 25px rgba(0,0,0,0.2)"
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10
            }}
            className="modal-book-btn" onClick={bookTime}>Book time</motion.button>
          :
          <button className="modal-book-btn-behandler">Book time</button>




}

        <button className="modal-cancel-btn" onClick={avbrytBooking}>Avbryt</button>
      </dialog>
      
  </>
    
  )
}

export default BookTimePage