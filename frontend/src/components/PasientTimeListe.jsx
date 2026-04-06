
import { useState } from "react";
import toast from "react-hot-toast";
import PasientTimeCelle from "../components/PasientTimeCelle.jsx";
import { time, motion, AnimatePresence } from "motion/react";

const PasientTimeListe = ({ timer, avlysTime }) => {
    
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
            <AnimatePresence mode="popLayout">
                <motion.div className="pasientTimer-container" layout>
                    {timer.map((time) => (
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
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </>
  )
}

export default PasientTimeListe