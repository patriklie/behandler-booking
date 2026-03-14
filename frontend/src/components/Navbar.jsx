import { NavLink } from "react-router";
import { Squash as Hamburger } from 'hamburger-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from "react";
import { Info, ClipboardClock, Calendar1, CircleUserRound, LogOut } from "lucide-react";

const Navbar = () => {

  const [isOpen, SetIsOpen] = useState(false);

  return (
    <>  
      <nav className="navbar">

        <motion.div className="navbar-animasjon"
          animate={{
            height: isOpen ? "calc(100vh - 32px)" : "60px"
          }}
          transition={{ type: "spring", duration: .5 }}
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
          

          <div className="navbar-links">
            <Calendar1 color="black" size={30} strokeWidth={1}/>
            <NavLink to="/avtaler">Kalender</NavLink>
          </div>

          <div className="navbar-links">
            <ClipboardClock color="black" size={30} strokeWidth={1}/>
            <NavLink to="/avtaler">Mine avtaler</NavLink>
          </div>

          <div className="navbar-links">
            <CircleUserRound color="black" size={30} strokeWidth={1}/>
            <NavLink to="/avtaler">Min profil</NavLink>
          </div>

          <div className="navbar-links">
            <Info color="black" size={30} strokeWidth={1}/>
            <NavLink to="/avtaler">Om oss</NavLink>
          </div>

          <div className="navbar-links">
            <LogOut color="black" size={30} strokeWidth={1}/>
            <NavLink to="/avtaler">Logg ut</NavLink>
          </div>
    

        </motion.div>


      </nav>
    </>
  )
}

export default Navbar