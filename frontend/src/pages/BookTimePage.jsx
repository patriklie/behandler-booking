import ProfileCard from "../components/ProfileCard.jsx";
import { useAppStore } from "../store/authStore.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRef } from "react";

const BookTimePage = () => {
  
  const token = useAppStore((state) => state.token);
  const [valgtBehandler, setValgtBehandler] = useState(null);
  const [alleBehandlere, setAlleBehandlere] = useState(null);
  const swiperRef = useRef(null);
  
  useEffect(() => {
  if (!swiperRef.current) return;

  if (valgtBehandler) {
    swiperRef.current.allowTouchMove = false;
    swiperRef.current.allowSlideNext = false;
    swiperRef.current.allowSlidePrev = false;
  } else {
    swiperRef.current.allowTouchMove = true;
    swiperRef.current.allowSlideNext = true;
    swiperRef.current.allowSlidePrev = true;
  }
}, [valgtBehandler]);
  
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
      <div className="rounded-info-box"><span>{ valgtBehandler ? "Valgt behandler" : "Velg behandler" }</span></div>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        style={{ padding: "0 16px 20px 16px" }}
        spaceBetween={50}
        slidesPerView={1}
        className={`mySwiper ${valgtBehandler ? "locked" : ""}`}
        pagination={{ clickable: true }}
        modules={[ Pagination ]}
      >
        {
         alleBehandlere && alleBehandlere.map((behandler) => {
            return <SwiperSlide key={behandler._id}><ProfileCard cursorEnabled={true} velgbehandler={() => setValgtBehandler((prev) => { return prev?._id === behandler._id ? null : behandler })} valgt={behandler._id === valgtBehandler?._id} username={behandler.username} email={behandler.email} role={behandler.role} typeBehandler={behandler.typeBehandler} profilbilde={behandler.profilbilde} /></SwiperSlide>
          })
        }
      </Swiper>
      
  </>
    
  )
}

export default BookTimePage