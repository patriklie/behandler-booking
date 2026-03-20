import { Info, ArrowBigRight } from "lucide-react";
import Card from "../components/Card.jsx";
import figur from "../assets/freepik__background__36259.png";
import { motion } from "motion/react"


const About = () => {
  return (
    <>
      <Card
        /*icon={<Info strokeWidth={2} size={40} color="#FFFFFF" />} */
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
    </>
  );
}

export default About