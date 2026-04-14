import { Clock, Info, User, Wallet } from "lucide-react";
import { motion } from "motion/react";

const TimeListe = ({ timerValgtDato, slettTime, onTimeKlikk, onBehandlerTimeKlikk, musepeker }) => {
    

    return (
        <>
            {
                timerValgtDato.map((time) => {
                    return (
                        <div style={{ cursor: musepeker ? "pointer" : "default"  }} key={time._id} className="time-celle" onClick={ onBehandlerTimeKlikk ? () => onBehandlerTimeKlikk(time) : undefined }>
                            
                            <div className="time-top-flex">
                                <div className="time-flex"><Clock size={12} color="#444444" /> <span>{time.startTid}</span>-<span>{time.sluttTid}</span></div>
                                <div className="time-flex"><Info size={12} color="#444444" /> <span>{time.status}</span></div>
                            </div>
                            
                            <div className="time-top-flex">
                                <div className="time-flex"><Wallet size={12} color="#444444" /> <span>{time.pris}kr</span></div>
                                {slettTime && <div className="time-flex delete"><span onClick={(e) => { e.stopPropagation(); slettTime(time); }} >Slett time</span></div> }  
                                {onTimeKlikk && <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0px 5px 5px rgba(0,0,0,0.1)"
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 10
                                    }}
                                    className="time-flex se-time" onClick={() => onTimeKlikk(time)}>Velg</motion.div>}
                            </div>
                          
                        </div>
                    )
                })
            }
        </>

    )
}

export default TimeListe