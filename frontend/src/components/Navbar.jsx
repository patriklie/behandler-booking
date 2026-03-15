import { NavLink, useNavigate } from "react-router";
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from "react";
import { useAppStore } from "../store/authStore.js";
import { Info, ClipboardClock, Calendar1, CircleUserRound, LogOut, LogIn } from "lucide-react";

const Navbar = () => {

  const [isOpen, SetIsOpen] = useState(false);
  const isAuth = useAppStore((state) => state.isAuth);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  const loggUtBruker = () => {
    logout();
    navigate("/login");
    SetIsOpen(false);
  }

  return (
    <>  
      <nav className="navbar">

        <motion.div className="navbar-animasjon"
          animate={{
            height: isOpen ? "calc(100vh - 32px)" : "60px"
          }}
          transition={{ type: "spring", duration: .5, delay: isOpen ? 0 : 0.2 }}
        >

          <div className="navbar-top">
            <div className="navbar-ham"><Hamburger size={20} rounded color="#000" toggled={isOpen} toggle={SetIsOpen} distance='sm' hideOutline={false} /></div>
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
          <NavLink to="/login" className="navbar-links" onClick={() => SetIsOpen(false)}>
            <LogIn style={{ pointerEvents: "none" }} color="black" size={30} strokeWidth={1}/>
            <span>Logg inn</span>
          </NavLink>
          }

          {isAuth &&
          <div className="navbar-links" onClick={loggUtBruker}>
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