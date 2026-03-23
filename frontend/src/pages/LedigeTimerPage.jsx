import ProfileCard from "../components/ProfileCard.jsx";
import { useProfile, useAppStore } from "../store/authStore.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const LedigeTimerPage = () => {
  
  
  const { username, email, role, typeBehandler } = useProfile();
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
        <SwiperSlide><ProfileCard username={username} email={email} role={role} typeBehandler={typeBehandler} /></SwiperSlide>
        <SwiperSlide><ProfileCard username={username} email={email} role={role} typeBehandler={typeBehandler} /></SwiperSlide>
        <SwiperSlide><ProfileCard username={username} email={email} role={role} typeBehandler={typeBehandler} /></SwiperSlide>
      </Swiper>
      
  </>
    
  )
}

export default LedigeTimerPage