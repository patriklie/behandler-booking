import { CheckCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useMeasure from "react-use-measure";

const FeatureListe = () => {
    
    const [visRad, setVisRad] = useState(null);
    const [ref, bounds] = useMeasure();
    const handleOpenRad = (radnummer) => {
        setVisRad(radnummer === visRad ? null : radnummer);
    }
    
    
  return (
      <>
          <div className="feature-grid-container">
              <div className="feature-grid"> {/* lager radnivå grid istedet */}
                  
                  <div className="feature-rad">
                    <div className="feature-navn">
                          <ChevronDown
                              className={`feature-chevron ${visRad === 1 ? "feature-chevron-open" : ""}`}
                              onClick={() => handleOpenRad(1)} />
                        <div>Funksjon 1</div>
                    </div>
                      <div className="feature-status">
                          <CheckCircle size={18} />
                          <div>Ferdig</div>
                      </div>
                      <AnimatePresence>
                      {visRad === 1 &&
                        <motion.div
                            className="feature-detaljer"
                            initial={{ height: 0 }}
                            animate={{ height: bounds.height }}
                            exit={{ height: 0 }}
                              >
                                  <div className="feature-inner-detaljer" ref={ref}>
                                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur totam ratione nostrum vitae ex quaerat iste tempora itaque illo ut repudiandae distinctio quae alias odit, repellat, dolorem officia molestias! Facere?
                                  </div>
                        </motion.div>
                          }
                          </AnimatePresence> 
                             
                  </div>
                  
                  
          
              </div>
          </div>
      </>
  )
}

export default FeatureListe