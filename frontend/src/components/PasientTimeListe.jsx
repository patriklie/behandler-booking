
import { useState } from "react";
import toast from "react-hot-toast";
import PasientTimeCelle from "../components/PasientTimeCelle.jsx";
import { time } from "motion/react";

const PasientTimeListe = ({ timer }) => {
    
    const dagerTilTime = (timeString) => {
        const idag = new Date();
        const timeDato = new Date(timeString);
        const diffMs = timeDato - idag;
        const diffDager = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        
        if (diffDager <= 0) return "0";
        return `${diffDager}`;   
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
         
            <div className="pasientTimer-container">
                {
                    timer.map((time) => {
                        return <PasientTimeCelle key={time._id} formatertDato={formatDato(time.dato)} time={time} dagerTilTime={dagerTilTime(time.dato)} />
                    })
                }
                
                
            </div>
        </>
  )
}

export default PasientTimeListe