import { useState } from "react";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import DrawerOpprettKlinikk from "../components/DrawerOpprettKlinikk.jsx";

const Klinikk = () => {
  
  const [showOpprettKlinikkDrawer, setShowOpprettKlinikkDrawer] = useState(false);
  
  const openDrawer = () => {
    console.log("Åpner drawer for opprett klinikk")
    setShowOpprettKlinikkDrawer(true);
  }
  
  const closeDrawer = () => {
    console.log("Lukker drawer for opprett klinikk");
    setShowOpprettKlinikkDrawer(false);
  }

    return (
      <>
        <div onClick={openDrawer}>Opprett Klinikk knapp</div>
        
        {showOpprettKlinikkDrawer && 
          <DrawerOpprettKlinikk closeDrawer={closeDrawer} />
        }
        
      </>

    )
  }

  export default Klinikk;