import { ChevronDown } from "lucide-react";
import { motion } from "motion/react"
import { useNavigate } from "react-router";
import Isometric from "../assets/IsoMetric_klinikk.png";
import FeatureListe from "../components/FeatureListe.jsx";
import HelseBookingLogo500 from "../assets/HelseBooking_500.png";

const About = () => {
  
  const navigate = useNavigate();
  
  return (
    <>      
      <section className="diagonal">
        <div className="wrapper">
          <div>
            <h2 className="section-title">En enkel måte å booke behandling</h2>
            <p className="section-tekst">HelseBooking er en moderne bookingplattform som kobler pasienter
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
              onClick={() => navigate("/booktime")}
            >Kom i gang!</motion.button>
          </div>
          
          <div className="figur-placeholder"></div> {/* ikke i flyten */}
          <div className="figur2"></div>
                 
        </div>
      </section>
      
      <section className="about-section">

          <img className="isometric-klinikk" src={Isometric} />
          <div className="isometric-tekst">
            <div className="about-section-overskrift">Behandlere samlet på et sted</div>
          <div className="about-section-innhold">Alle behandlere samlet i én oversiktlig plattform. Finn riktig behandler raskt uten å måtte lete på tvers av ulike systemer. Utforsk tilgjengelige tider, sammenlign behandlere og book direkte på få sekunder.</div>
          </div>

        
      </section>
      

  
      <div className="feature-liste-topp-overskrift">Alle HelseBooking sine</div>
      <div className="feature-liste-overskrift">Funksjoner</div>
      <div className="feature-chevron-wrapper">
        <ChevronDown />
      </div>
      <FeatureListe />
      
      {/* Infosection */}
      <div className="info-section-container">
        <div className="info-section-flex">
          <div className="info-section-big">50+</div>
          <div className="info-section-small">Behandlere</div>
        </div>
        <div className="info-section-flex">
          <div className="info-section-big">1500+</div>
          <div className="info-section-small">Pasienter</div>
        </div>
        <div className="info-section-flex">
          <div className="info-section-big">3300+</div>
          <div className="info-section-small">Timer bestilt</div>
        </div>
        <div className="info-section-flex">
          <div className="info-section-big">30+</div>
          <div className="info-section-small">Klinikker</div>
        </div>

        <div className="disclaimer">*Fiktive tall</div>
      </div>
      
      
      {/* FOOTER */}
      <img className="feature-helse-logo" src={HelseBookingLogo500} />
      <div className="feature-footer">En plattform laget av Patrik Bystrøm Lie</div>
      
    </>
  );
}

export default About