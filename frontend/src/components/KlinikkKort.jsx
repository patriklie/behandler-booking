import { SquarePen, UsersRound, UserMinus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FlyttKart } from "./FlyttKart";
import L from "leaflet";


const KlinikkKort = ({ klinikk, openRedigerKlinikkDrawer, visBehandlere, toggleBehandlere, leggTilBehandlerKlinikk, slettBehandlerFraKlinikk, slettKlinikk, alleBehandlere }) => {
    
  const { navn, adresse, latitude, longitude, behandlere, opprettetAv } = klinikk;
  const [valgtBehandler, setValgtBehandler] = useState("");
  
  const customIcon = L.icon({
    iconUrl: "/HelseBooking_32.png",
    iconSize: [32, 32],   
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
    
  return (
    <div className="klinikk-kort" >
      <SquarePen className="klinikk-kort-settings-icon" onClick={() => openRedigerKlinikkDrawer(klinikk)} />
      <div className="klinikk-kort-type">Klinikk</div>
      <div className="klinikk-kort-navn">{navn}</div>
      <div className="klinikk-kort-adresse">{adresse}</div>
      
      <MapContainer
        center={[latitude, longitude]}
        attributionControl={false} /* Denne legger jeg til true eller fjerner ved prodsetting  */
        zoom={13}
        className="klinikk-kort-map-container"
        zoomControl={false}
      >
        <TileLayer
          /* url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" */ /* Denne var kaldere også fin */ 
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          /* attribution='&copy; <a href="https://carto.com/">CARTO</a>' AKTIVER attribution linken i prodsetting */
        />
        <Marker position={[latitude, longitude]} icon={customIcon}>
          <Popup>
            <div style={{ fontWeight: "600" }}>{navn}</div>
            <div>{adresse}</div>
          </Popup>
        </Marker>
        <FlyttKart latitude={latitude} longitude={longitude} />
      </MapContainer>
      
      <div className="klinikk-kort-behandlere-container">
        <div className="klinikk-kort-antall-behandlere-wrapper">
          <UsersRound size={18} color="grey" />
          <div className="klinikk-kort-antall-behandlere">{behandlere.length}</div>
        </div>

        <ChevronDown className={`klinikk-kort-chevron ${visBehandlere ? "klinikk-kort-chevron-open" : ""}`} onClick={() => toggleBehandlere(klinikk._id)} >Rediger Behandlere</ChevronDown>
      </div>
      
      
      <AnimatePresence>
      {visBehandlere &&
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            style={{ overflow: "hidden" }}
            className="klinikk-kort-behandler-wrapper">
          
            <div>
              <select
                className="klinikk-kort-behandler-select"
                value={valgtBehandler}
                name="behandler-select"
                id="behandler-select"
                onChange={(e) => {
                  const behandlerId = e.target.value
                  if (!behandlerId) return;
                  setValgtBehandler("");
                  leggTilBehandlerKlinikk(klinikk._id, behandlerId);
                }}
              >
                <option value="">Legg til behandler</option>
                {alleBehandlere
                  .filter(b => !behandlere.some(kb => kb._id === b._id)) // filtrer ut de som allerede er lagt til kom tilbake til denne
                  .map(b => (
                    <option key={b._id} value={b._id}>{b.username}</option>
                  ))
                }
              </select>
            </div>
            

            <div className="klinikk-kort-behandler-liste">
            
            
            {behandlere.map((behandler) => {
            const thumbnailUrl = behandler.profilbilde?.replace("/upload/", "/upload/w_48,h_48,c_fill/");
            return (
              <div className="klinikk-kort-behandler-add-container" key={behandler._id}>
                <img className="klinikk-kort-behandler-profilbilde" src={thumbnailUrl} />
                <div className="klinikk-kort-behandler-navn">{behandler.username}</div>
                <UserMinus className="klinikk-kort-behandler-icon-remove" onClick={() => slettBehandlerFraKlinikk(klinikk._id, behandler._id)} />
              </div>
            )
            })}
            </div>
          
          
        </motion.div>
      }
      </AnimatePresence>
      
      
    </div>
  )
}

export default KlinikkKort