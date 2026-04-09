import { motion, useTransform, useMotionValue, animate } from "motion/react"
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Calendar1, Clock, ClockCheck, Wallet, CalendarClock, User, Mail, Trash } from "lucide-react";
import { useAppStore } from "../store/authStore";
import toast from "react-hot-toast";


const DrawerEndretime = ({ time, closeBehandlerTime, hentBehandlerTimer, slettTime }) => {
    
    const y = useMotionValue(0);
    const swipeAvstand = 150;
    const overlayOpacity = useTransform(y, [0, swipeAvstand], [1, 0]);
    const token = useAppStore((state) => state.token);
    const dateInputRef = useRef();
    const timeInputStartRef = useRef();
    const timeInputStopRef = useRef();
    const [allePasienter, setAllePasienter] = useState([]);
    
    const [endretTime, setEndretTime] = useState({
        dato: time.dato.split("T")[0] || "",
        startTid: time.startTid || "",
        sluttTid: time.sluttTid || "",
        pris: time.pris || "",
        pasientID: time.pasient?._id || ""
    })
    
    const valgtPasient = allePasienter.find(p => p._id === endretTime.pasientID);
    
    const handleTime = (e) => {
        setEndretTime({ ...endretTime, [e.target.name]: e.target.value })
    }
    
    const handleClose = () => {
        animate(y, window.innerHeight, {
            type: "tween",
            duration: 0.25,
            ease: "easeIn",
            onComplete: closeBehandlerTime
        })
    }
    
    useEffect(() => {
        y.set(window.innerHeight);
        animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
    }, []);
    
    useEffect(() => {
        const hentAllePasienter = async () => {
            try {
                
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/pasienter`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setAllePasienter(response.data.pasienter)
            } catch (error) {
                toast.error(error.response?.data?.message || "Feil ved henting av pasienter");
            }
        }
        hentAllePasienter();
    }, []);
    
    console.log(allePasienter)
    
    const endreTime = async (e) => {
        e.preventDefault();
        console.log("endrer time");
        
        try {
            
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}/api/time/${time._id}/endretime`, endretTime, {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            
            toast.success(response.data.message);
            hentBehandlerTimer();
            handleClose();
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Noe gikk galt ved endring av time.")
        }
    }
        console.log(valgtPasient)
    return (
    <>
        <motion.div
            className="time-drawer-overlay"
            onClick={handleClose}
            style={{ opacity: overlayOpacity }}
        >
                
        </motion.div>
            
        <motion.div
            drag="y"
            style={{ y }}
            dragElastic={0.1}
            dragConstraints={{ top: 0 }}
            onDragEnd={(e, info) => {
                if (info.offset.y > swipeAvstand || info.velocity.y > 800) {
                    handleClose();
                } else {
                    animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
                }
            }}
            className="time-drawer-panel"
            >
            <div className="time-drawer-drag-wrapper">
                <div className="time-drawer-drag"></div>
            </div>

            <form className="form-container drawer-form" onSubmit={endreTime}>
                <div className="drawer-form-overskrift">Endre time</div>
                <div className="input-container">
                    <label htmlFor="dato">Dato</label>
                    <div className="input-wrapper">
                        <Calendar1 className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => dateInputRef.current.showPicker()} />
                        <input type="date" ref={dateInputRef} value={endretTime.dato} onChange={handleTime} id="dato" name="dato" placeholder="dato" required />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="startTid">Starttid</label>
                    <div className="input-wrapper">
                        <Clock className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => timeInputStartRef.current.showPicker()} />
                            <input ref={timeInputStartRef} value={endretTime.startTid} onChange={handleTime} type="time" id="startTid" name="startTid" placeholder="start tid" required />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="sluttTid">SluttTid</label>
                    <div className="input-wrapper">
                        <ClockCheck className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => timeInputStopRef.current.showPicker()} />
                            <input ref={timeInputStopRef} value={endretTime.sluttTid} onChange={handleTime} type="time" id="sluttTid" name="sluttTid" placeholder="slutt tid" required />
                    </div>
                </div>

                <div className="input-container">
                    <label htmlFor="pris">Pris</label>
                    <div className="input-wrapper">
                        <Wallet className="input-icon" size={18} color="grey" strokeWidth={1.5} />
                            <input type="number" id="pris" name="pris" value={endretTime.pris} onChange={handleTime} min={0} placeholder="NOK / Timepris" required />
                    </div>
                    </div>
                    
                    <div className="input-container">
                        <label htmlFor="pasientID">Pasient</label>
                        <div className="input-wrapper">
                            <User className="input-icon" size={18} color="grey" strokeWidth={1.5} />
                            {   valgtPasient &&
                                <Mail className="drawer-form-contact" strokeWidth={1.5} onClick={() => window.location.href = `mailto:${valgtPasient.email}`} />}
                            <select id="pasientID" name="pasientID" value={endretTime.pasientID} onChange={handleTime}>
                                <option value="">Ingen pasient</option>
                                {allePasienter.map(pasient => (
                                    <option key={pasient._id} value={pasient._id}>
                                        {pasient.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 17 }}
                    type="submit"
                    className="logginn-btn drawer-btn">
                    Oppdater timen <CalendarClock size={20} />
                </motion.button>
                    <div className="drawer-slett" onClick={async () => {
                        await slettTime(time);
                        handleClose();
                    }}>Slett time</div>
                </form>
        </motion.div>
    </>

  )
}

export default DrawerEndretime