import axios from "axios";
import { useEffect, useState } from "react";
import HelseBookingTekst from "../assets/HelseBooking_tekst.webp";
import { ChevronDown } from "lucide-react";

const AboutBehandlere = () => {
    
    const [alleBehandlere, setAlleBehandlere] = useState([]);
    
    // pugge mer på Fisher Yates algoritmen ved anledning
    const shuffle = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    
    const getAlleBehandlerePublic = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/behandlere/public`);
            setAlleBehandlere(shuffle(response.data));
        } catch (error) {
            console.error(error.response?.data?.message);
        }
    }
     
    useEffect(() => {
        getAlleBehandlerePublic();
    }, [])
    
  return (
      <>
          
          <div className="about-behandlere-grid-wrapper">
                          
              <div className="about-behandlere-topp-overskrift">
                    <div>Møt</div> 
                  <img src={HelseBookingTekst} />
                    <div>sine</div>
                </div>
              <div className="about-behandlere-overskrift">fagpersoner</div>
              <div className="about-behandlere-chevron-wrapper">
                  <ChevronDown />
              </div>
            <div className="about-behandlere-grid">
          
            {
                alleBehandlere.slice(0, 6).map((behandler) => {
                    return (
                        <div className="about-behandlere-grid-celle" key={behandler._id}>
                            <div className="about-behandlere-profilbilde-wrapper">
                                <img className="about-behandlere-profilbilde" src={behandler.profilbilde} ></img>
                            </div>
                            <div className="about-behandlere-navn">{behandler.username}</div>
                            <div className="about-behandlere-type">{behandler.typeBehandler}</div>
                            
                        </div>
                    )
                })
            }
          
          
            </div>
        </div>
      </>
  )
}

export default AboutBehandlere