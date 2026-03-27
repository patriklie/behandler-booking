import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Kalender = ({ onDatoValg }) => {
    
    const [year, setYear] = useState(new Date().getFullYear())
    const [month, setMonth] = useState(new Date().getMonth())
    const [valgtDato, setValgtDato] = useState(""); // denne er kun for stylinga
    const months = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"]
    const ukedager = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];
    
    let daysInThisMonth = new Date(year, month + 1, 0).getDate();
    
    let firstDayOfThisMonth = new Date(year, month, 1).getDay(); 
    firstDayOfThisMonth = firstDayOfThisMonth === 0 ? 6 : firstDayOfThisMonth - 1; // justere for norsk kalender
    
    const tommeCeller = Array(firstDayOfThisMonth).fill(null);
    const dagerCeller = Array.from({ length: daysInThisMonth }, (_, i) => i + 1);
    
    const monthCeller = [...tommeCeller, ...dagerCeller];
    
    const previousMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    }
    
    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    }
    
const handleDatoValg = (dato) => {
    if (!dato) return;
    console.log(`${year}-${String(month + 1).padStart(2, "0")}-${String(dato).padStart(2, "0")}`);
    setValgtDato(`${year}-${String(month + 1).padStart(2, "0")}-${String(dato).padStart(2, "0")}`);
    onDatoValg(`${year}-${String(month + 1).padStart(2, "0")}-${String(dato).padStart(2, "0")}`);
}
    
    
  return (
      <>
          <div className="kalender-container">
              
              <div className="kalender-month-year">
                  <div className="kalender-icon-wrapper" onClick={previousMonth}><ChevronLeft /></div>
                  <div>{months[month]} {year}</div>
                  <div className="kalender-icon-wrapper" onClick={nextMonth}><ChevronRight /></div>
              </div>
              
              <div className="kalender-grid">
                  {ukedager.map((dag) => {
                      return <div key={dag} className="kalender-dager">{dag[0]}</div>
                  })}
                  
                  {monthCeller.map((dato, index) => {
                      return <div key={index} className={`${dato === null ? "kalender-celler-null" : "kalender-celler-datoer"} ${dato && `${year}-${String(month + 1).padStart(2, "0")}-${String(dato).padStart(2, "0")}` === valgtDato ? "valgt" : ""}`} onClick={() => handleDatoValg(dato)}>{dato}</div>
                  })}  
                  
              </div>
          
          </div>
      
      </>
  )
}

export default Kalender