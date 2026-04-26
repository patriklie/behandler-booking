import { motion, useTransform, useMotionValue, animate } from "motion/react"
import { useEffect, useState } from "react";
import axios from "axios";
import { Hospital, HospitalIcon, Map, Plus } from "lucide-react";
import { useAppStore } from "../store/authStore";
import toast from "react-hot-toast";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import {
    GeoapifyContext,
    GeoapifyGeocoderAutocomplete
} from '@geoapify/react-geocoder-autocomplete';


const DrawerOpprettKlinikk = ({ closeDrawer, oppdaterKlinikker }) => {
    
    const y = useMotionValue(0);
    const swipeAvstand = 150;
    const overlayOpacity = useTransform(y, [0, swipeAvstand], [1, 0]);
    const token = useAppStore((state) => state.token);
    const [resetKey, setResetKey] = useState(0);
    const [klinikk, setKlinikk] = useState({
        navn: "",
        adresse: "",
        latitude: null,
        longitude: null,
    })
    
    const handleClose = () => {
        animate(y, window.innerHeight, {
            type: "tween",
            duration: 0.25,
            ease: "easeIn",
            onComplete: closeDrawer
        })
    }
    
    useEffect(() => {
        y.set(window.innerHeight);
        animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
    }, []);
    
    const handleKlinikk = (e) => {
        setKlinikk({ ...klinikk, [e.target.name]: e.target.value })
    }

    const opprettKlinikk = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/klinikk`, klinikk, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setKlinikk({
                navn: "",
                adresse: "",
                latitude: null,
                longitude: null,
            })
            setResetKey((prev) => prev + 1);
            oppdaterKlinikker();
            handleClose();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Noe gikk galt ved oppretting av klinikk");
        }
    }

    const onPlaceSelected = (feature) => {
        if (!feature) return
        setKlinikk((prev) => ({
            ...prev,
            adresse: feature.properties.formatted,
            latitude: feature.properties.lat,
            longitude: feature.properties.lon
        }))
    };
    
     
    return (
    <>
        <motion.div
            className="opprett-klinikk-drawer-overlay"
            onClick={handleClose}
            style={{ opacity: overlayOpacity }}
        >
                
        </motion.div>
            
        <motion.div
            className="opprett-klinikk-drawer-panel"
            drag="y"
            style={{ y }}
            dragElastic={0.1}
            dragConstraints={{ top: 0 }}
            onDragEnd={(e, info) => {
                if (info.offset.y > swipeAvstand || info.velocity.y > 800) {
                    handleClose();
                } else {
                    animate(y, 0, { type: "spring", stiffness: 300, damping: 30 });
                }
            }}
            
            >
            <div className="opprett-klinikk-drawer-drag-wrapper">
                <div className="opprett-klinikk-drawer-drag"></div>
            </div>

            <form className="klinikk-form-container" onSubmit={opprettKlinikk}>

                <div className="klinikk-input-container">
                    <label htmlFor="navn">Klinikknavn</label>
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
                                lang="no"
                                key={resetKey}
                                limit={8}
                                addDetails={true}
                                placeSelect={onPlaceSelected}
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
                    <div>Opprett ny Klinikk</div>
                        <Hospital strokeWidth={1.5} size={20} />
                    </motion.button>
                    <div onClick={handleClose} className="klinikk-opprett-avbryt-btn">Avbryt</div>

            </form>
           
        </motion.div>
    </>

  )
}

export default DrawerOpprettKlinikk;