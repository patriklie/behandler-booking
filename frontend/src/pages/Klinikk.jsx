import { useEffect, useState } from "react";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import DrawerOpprettKlinikk from "../components/DrawerOpprettKlinikk.jsx";
import { Hospital } from "lucide-react";
import axios from "axios";
import { useAppStore } from "../store/authStore.js";
import KlinikkKort from "../components/KlinikkKort.jsx";
import toast from "react-hot-toast";
import DrawerRedigerKlinikk from "../components/DrawerRedigerKlinikk.jsx";
import Isometric from "../assets/IsoMetric_klinikk.png";

const Klinikk = () => {
  
  const token = useAppStore((state) => state.token);
  const [showOpprettKlinikkDrawer, setShowOpprettKlinikkDrawer] = useState(false);
  const [showRedigerKlinikkDrawer, setShowRedigerKlinikkDrawer] = useState(false);
  const [klinikker, setKlinikker] = useState([]);
  const [valgtKlinikk, setValgtKlinikk] = useState(null);
  const [openCard, setOpenCard] = useState(false);
  const [alleBehandlere, setAlleBehandlere] = useState([]);
  
  const toggleBehandlere = (klinikkId) => {
    setOpenCard(openCard === klinikkId ? null : klinikkId)
  }
  
  const hentAlleKlinikker = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/klinikk`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }) 
      setKlinikker(response.data);
      
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }
  
  const hentAlleBehandlere = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/behandlere/enkel`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setAlleBehandlere(response.data);
      console.log("Hent alle behandlere: ", response.data)

    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  }
  
  const slettBehandlerFraKlinikk = async (klinikkId, behandlerId ) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/klinikk/${klinikkId}/behandler/${behandlerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      hentAlleKlinikker()
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  
  const leggTilBehandlerKlinikk = async (klinikkId, behandlerId) => {
    try {
      console.log("KlinikkId: ", klinikkId, "behandlerId: ", behandlerId)
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/klinikk/${klinikkId}/behandler`, { behandlerId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      hentAlleKlinikker();
      toast.success(response?.data?.message)
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  
  const slettKlinikk = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/klinikk/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      hentAlleKlinikker()
      toast.success(response?.data?.message)
      closeRedigerKlinikkDrawer();
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
  
  useEffect(() => {
    hentAlleKlinikker();
  }, [])
  
  useEffect(() => {
    hentAlleBehandlere();
  }, [])
  
  const openDrawer = () => {
    console.log("Åpner drawer for opprett klinikk")
    setShowOpprettKlinikkDrawer(true);
  }
  
  const closeDrawer = () => {
    console.log("Lukker drawer for opprett klinikk");
    setShowOpprettKlinikkDrawer(false);
  }
  
  const openRedigerKlinikkDrawer = (klinikk) => {
    setValgtKlinikk(klinikk)
    setShowRedigerKlinikkDrawer(true);
  }
  
  const closeRedigerKlinikkDrawer = () => {
    setValgtKlinikk(null);
    setShowRedigerKlinikkDrawer(false);
  }

    return (
      <>
        <div className="open-klinikk-opprett-btn" onClick={openDrawer}>
          <img className="opprett-klinikk-image" src={Isometric} />
          <div>Opprett Klinikk</div>
        </div>
        
        <div className="klinikk-kort-wrapper">
          <div className="klinikk-kort-container">
            {klinikker.map((klinikk) => {
              return <KlinikkKort key={klinikk._id} klinikk={klinikk} slettKlinikk={slettKlinikk} openRedigerKlinikkDrawer={openRedigerKlinikkDrawer} visBehandlere={openCard === klinikk._id} slettBehandlerFraKlinikk={slettBehandlerFraKlinikk} leggTilBehandlerKlinikk={leggTilBehandlerKlinikk} toggleBehandlere={toggleBehandlere} alleBehandlere={alleBehandlere} />
            })}
          </div>
        </div>
        
        {showOpprettKlinikkDrawer && 
          <DrawerOpprettKlinikk closeDrawer={closeDrawer} oppdaterKlinikker={hentAlleKlinikker} />
        }
        
        {showRedigerKlinikkDrawer &&
          <DrawerRedigerKlinikk closeDrawer={closeRedigerKlinikkDrawer} slettKlinikk={slettKlinikk} klinikk={valgtKlinikk} oppdaterKlinikker={hentAlleKlinikker} />
        
        }
        
      </>

    )
  }

  export default Klinikk;