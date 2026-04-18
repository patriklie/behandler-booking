import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { useAppStore } from "../store/authStore";
import { Hospital, Map, Plus } from "lucide-react";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';

const Klinikk = () => {
  
  const token = useAppStore((state) => state.token);
  const [klinikk, setKlinikk] = useState({
    navn: "",
    adresse: "",
  })
  
  const handleKlinikk = (e) => {
    setKlinikk({ ...klinikk, [e.target.name]: e.target.value })
  }
  
  
  const opprettKlinikk = async (e) => {
    e.preventDefault();
    console.log("Oppretter klinikk");

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/klinikk`, klinikk, {
        headers: { Authorization: `Bearer ${token}` }
      })

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Noe gikk galt ved oppretting av klinikk");
    }
  }
  
  const onPlaceSelected = (feature) => {
    console.log('Selected:', feature?.properties?.formatted);
  };

  const onSuggestionsChange = (list) => {
    console.log('Suggestions:', list);
  };
  
    return (
      <>
        <form className="klinikk-form-container" onSubmit={opprettKlinikk}>
          
          <div className="klinikk-input-container">
            <label htmlFor="dato">Klinikknavn</label>
            <div className="klinikk-input-wrapper">
              <Hospital className="klinikk-input-icon" size={18} color="grey" strokeWidth={1.5} />
              <input type="text" value={klinikk.navn} onChange={handleKlinikk} id="navn" name="navn" placeholder="Klinikknavn" required />
            </div>
          </div>
          
          <div className="klinikk-input-container">
            <label htmlFor="dato">Adresse</label>
            <div className="klinikk-input-wrapper">
              <Map className="klinikk-input-icon" size={18} color="grey" strokeWidth={1.5} />
          <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_API_KEY}>
            <GeoapifyGeocoderAutocomplete
              placeholder="Søk etter adresse"
              lang="en"
              limit={8}
              addDetails={true}
              placeSelect={onPlaceSelected}
              suggestionsChange={onSuggestionsChange}
            />
              </GeoapifyContext>
              
            </div>
          </div>
          
         
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 17 }}
            type="submit"
            className="klinikk-opprett-btn">
            Opprett Klinikk <Plus size={20} />
          </motion.button>

        </form>
      </>
      
      
    )
  }

  export default Klinikk;