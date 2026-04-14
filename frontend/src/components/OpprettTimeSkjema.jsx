import axios from "axios";
import { Calendar1, Clock, ClockCheck, Wallet, ClockPlus } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { useAppStore } from "../store/authStore";
import toast from "react-hot-toast";

const OpprettTimeSkjema = ({ hentBehandlerTimer }) => {
    
  const dateInputRef = useRef();
  const timeInputStartRef = useRef();
  const timeInputStopRef = useRef();  
  const token = useAppStore((state) => state.token);
 
  
  const [time, setTime] = useState({
    dato: "",
    startTid: "",
    sluttTid: "",
    pris: "",
  })
  
  const handleTime = (e) => {
    setTime({ ...time, [e.target.name]: e.target.value })
  }
  
  const opprettTime = async (e) => {
    e.preventDefault();
    console.log("Oppretter time med følgende: ", time)
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/time`, time, {
          headers: { Authorization: `Bearer ${token}` }
        })
      
      toast.success(response.data.message);
      setTime({ dato: "", startTid: "", sluttTid: "", pris: "" })
      hentBehandlerTimer();
    } catch (error) {
      toast.error(error.response?.data?.message || "Noe gikk galt");
    }
    

    
  }
  
    return (
      
    <>

        <form className="form-container" onSubmit={opprettTime}>
        <div className="input-container">
          <label htmlFor="dato">Dato</label>
          <div className="input-wrapper">
            <Calendar1 className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => dateInputRef.current.showPicker()} />
            <input type="date" ref={dateInputRef} value={time.dato} onChange={handleTime} id="dato" name="dato" placeholder="dato" required />
          </div>
        </div>
          
        <div className="input-container">
          <label htmlFor="startTid">Starttid</label>
          <div className="input-wrapper">
            <Clock className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => timeInputStartRef.current.showPicker()} />
            <input  ref={timeInputStartRef} value={time.startTid} onChange={handleTime} type="time" id="startTid" name="startTid" placeholder="start tid" required />
          </div>
        </div>
          
          <div className="input-container">
            <label htmlFor="sluttTid">SluttTid</label>
            <div className="input-wrapper">
              <ClockCheck className="input-icon" size={18} color="grey" strokeWidth={1.5} onClick={() => timeInputStopRef.current.showPicker()} />
              <input ref={timeInputStopRef} value={time.sluttTid} onChange={handleTime} type="time" id="sluttTid" name="sluttTid" placeholder="slutt tid" required />
            </div>
          </div>
          
          <div className="input-container">
            <label htmlFor="pris">Pris</label>
            <div className="input-wrapper">
              <Wallet className="input-icon" size={18} color="grey" strokeWidth={1.5} />
              <input type="number" id="pris" name="pris" value={time.pris} onChange={handleTime} min={0} placeholder="NOK / Timepris" required />
            </div>
          </div>
          
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 17 }}
          type="submit"
          className="logginn-btn opprett-time-btn">
          Opprett time <ClockPlus size={20} />
        </motion.button>
          
      </form>
    </>
    
  )
}

export default OpprettTimeSkjema