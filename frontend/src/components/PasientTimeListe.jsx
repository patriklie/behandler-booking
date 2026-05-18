import { useState } from "react";
import PasientTimeCelle from "../components/PasientTimeCelle.jsx";
import { motion, AnimatePresence } from "motion/react";
import CharSmartPhone from "../assets/char_smartphone.webp";
import { Link } from "react-router";
import { ArrowUpNarrowWide } from "lucide-react";
    
const PasientTimeListe = ({ timer, avlysTime, openDrawer, kommendeTimer }) => {
    
    const [stigende, setStigende] = useState(true);
    const sortertListe = [...timer].sort((a, b) => {
        const diff =
            new Date(a.startDatoTidspunkt) - new Date(b.startDatoTidspunkt);
        return stigende ? diff : -diff;
    });
    
    const dagerTilTime = (timeString) => {
        const idag = new Date();
        const timeDato = new Date(timeString);
        const diffMs = timeDato - idag;
        const diffDager = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDager < 0) return "-1";
        if (diffDager === 0) return "0"
        return diffDager;   
    } 

    const formatDato = (datoString) => {
        const date = new Date(datoString)
        return new Intl.DateTimeFormat("no-NO", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }).format(date)
    }
    
    return (
        <>
            <div className="pasienttimer-sorter-wrapper">
                <motion.button
                    className="pasienttimer-sorter-button"
                    onClick={() => setStigende(prev => !prev)}
                    animate={{ rotate: stigende ? 0 : 180 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <ArrowUpNarrowWide size={30} />
                </motion.button>
            </div>
            <AnimatePresence mode="popLayout">

                <motion.div className="pasienttimer-container" layout>
                    {sortertListe.map((time) => (
                        <motion.div
                            key={time._id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -50, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PasientTimeCelle
                                avlysTime={avlysTime}
                                key={time._id}
                                formatertDato={formatDato(time.dato)}
                                time={time}
                                dagerTilTime={dagerTilTime(time.dato)}
                                openDrawer={openDrawer}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            
            {kommendeTimer.length === 0 && 
                <div className="pasienttimer-ingen-timer">
                    <div className="pasienttimer-ingen-timer-bubble">Her var det tomt..</div>

                    <img className="pasienttimer-ingen-timer-figur" src={CharSmartPhone} />
                    <motion.div
                        className="pasienttime-bestill-time"
                        whileHover={{
                            scale: 1.1,
                            boxShadow: "0px 15px 25px rgba(0,0,0,0.2)"
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 10
                        }}
                        >
                        <Link  to="/booktime">Bestill time</Link>
                    </motion.div>
                </div>
            }
        </>
  )
}

export default PasientTimeListe