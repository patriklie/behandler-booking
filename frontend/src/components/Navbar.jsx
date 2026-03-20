import { NavLink, useNavigate } from "react-router";
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef } from "react";
import { useAppStore } from "../store/authStore.js";
import { Info, ClipboardClock, Calendar1, CircleUserRound, LogOut, LogIn, UserPlus } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {

  const [isOpen, SetIsOpen] = useState(false);
  const isAuth = useAppStore((state) => state.isAuth);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  const username = useAppStore((state) => state.username);
  
  const touchStartY = useRef(null);

  const loggUtBruker = () => {
    toast.success(`Logget ut ${username}`);
    logout();
    navigate("/login");
    SetIsOpen(false);
  }

  return (
    <>  
      <nav className="navbar">

        <motion.div className="navbar-animasjon"
          
          onClick={() => SetIsOpen(!isOpen)}
          
          onTouchStart={(e) => {
          touchStartY.current = e.touches[0].clientY;
          }}
          
          onTouchEnd={(e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const diff = touchEndY - touchStartY.current;
            
            if (Math.abs(diff) > 50) {
              e.preventDefault();
              if (diff > 50) SetIsOpen(true);
              if (diff < -50) SetIsOpen(false);
            }
          }}
          
          animate={{
            height: isOpen ? "calc(100vh - 32px)" : "60px"
          }}
          transition={{ type: "spring", duration: .5, delay: isOpen ? 0 : 0.2 }}
        >

          <div className="navbar-top">
            <img src="/g15.svg" className="navbar-top-logo-svg" />
            <div className="navbar-ham" onClick={(e) => e.stopPropagation()}><Hamburger size={20} rounded color="#000" toggled={isOpen} toggle={SetIsOpen} distance='sm' hideOutline={false} /></div>
            <div className="navbar-logo"><span>Behandler</span>Booking</div>
            
          </div>

          <motion.div 
            className="navbar-divider"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isOpen ? 1 : 0 }}
            transition={{ type: "spring", duration: 0.3 }}
          />
          {isAuth && 
          <>
          <NavLink to="/timer" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <Calendar1 style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Kalender</span>
          </NavLink>

          <NavLink to="/avtaler" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <ClipboardClock style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Mine avtaler</span>
          </NavLink>

          <NavLink to="/profil" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <CircleUserRound style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Min profil</span>
          </NavLink>
          </>
          }

          <NavLink to="/about" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <Info style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Om oss</span>
          </NavLink>

          {!isAuth && 
          <>
          <NavLink to="/login" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <LogIn style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Logg inn</span>
          </NavLink>
          
          <NavLink to="/register" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <UserPlus style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Registrer</span>
          </NavLink>

          </>
          }

          {isAuth &&
          <div className="navbar-links logout-btn" onClick={loggUtBruker}>
            <LogOut style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Logg ut</span>
          </div>
          }

        </motion.div>

      </nav>
    </>
  )
}

export default Navbar