import { Info, ArrowBigRight } from "lucide-react";
import Card from "../components/Card.jsx";
import figur from "../assets/freepik__background__36259.png";
import { motion } from "motion/react"
import { Link, useNavigate } from "react-router";

const About = () => {
  
  const navigate = useNavigate();
  
  return (
    <>
      
      
{/*       <div className="margin-klassen">
        <Card
          image={figur}
          title={"om oss"}
          button={"Book time nå"}
          buttonLink={"/login"}
          buttonIcon={<ArrowBigRight fill="white" stroke="none" size={20} />}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.3, duration: 1, ease: "easeOut" }}
            className="card-undertitle-large">
            Den beste måten å booke behandler
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.4, duration: 1, ease: "easeOut" }}
            
            className="card-text">
            BehandlerBooking er en moderne bookingplattform som kobler pasienter
            og behandlere. Pasienter finner og booker ledige timer enkelt, mens
            behandlere får full oversikt over sin timeplan, alt på ett sted.
          </motion.div>
          </Card>
      </div> */}
      
      <section className="diagonal">
        <div className="wrapper">
          <div>
            <h2 className="section-title">En enkel måte å booke behandling på</h2>
            <p>BehandlerBooking er en moderne bookingplattform som kobler pasienter
              og behandlere. Pasienter finner og booker timer enkelt, mens
              behandlere får full oversikt over sin timeplan, alt på ett sted.</p>
            <motion.button
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.2)"
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
              className="about-button"
              onClick={() => navigate("/login")}
            >Kom i gang!</motion.button>
          </div>
          
          <div className="figur-placeholder"></div> {/* ikke i flyten */}
          <div className="figur2"></div>
          
                  
        </div>

      </section>
     
      
    </>
  );
}

export default About