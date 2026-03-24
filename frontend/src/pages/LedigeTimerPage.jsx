import ProfileCard from "../components/ProfileCard.jsx";
import { useAppStore } from "../store/authStore.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LedigeTimerPage = () => {
  
  const token = useAppStore((state) => state.token);
  const [valgtBehandler, setValgtBehandler] = useState(null);
  const [alleBehandlere, setAlleBehandlere] = useState(null);
  
  useEffect(() => {

    const hentAlleBehandlere = async () => {
    
      try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/behandlere`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        
      setAlleBehandlere(response.data.alleBehandlere)
      console.log("Her er alle behandleren: ", response.data.alleBehandlere) 
      } catch (error) {
      toast.error("Feil ved henting av behandlere.")  
      }   
    }
    hentAlleBehandlere();
  },[])
  
  return (
      
  <>
      <Swiper
        style={{ padding: "40px", marginTop: "16px" }}
        spaceBetween={50}
        slidesPerView={1}
        pagination={true}
        modules={[ Pagination ]}
        className="mySwiper"
      >
        {
         alleBehandlere && alleBehandlere.map((behandler) => {
            return <SwiperSlide key={behandler._id}><ProfileCard velgbehandler={() => setValgtBehandler(valgtBehandler?._id === behandler._id ? null : behandler)} valgt={behandler._id === valgtBehandler?._id} username={behandler.username} email={behandler.email} role={behandler.role} typeBehandler={behandler.typeBehandler} profilbilde={behandler.profilbilde} /></SwiperSlide>
          })
        }
      </Swiper>
      
  </>
    
  )
}

export default LedigeTimerPage