import defaultAvatar from "../assets/Profile_avatar_placeholder_large.png";
import { useRef } from "react";
import { ShieldCheck } from "lucide-react";

const ProfileCard = ({ profilbildeKlikk, username, email, role, typeBehandler, profilbilde, velgbehandler, valgt, cursorEnabled }) => {
    
    const inputField = useRef();
    
    const handleOnChangeProfile = async (e) => {
        await profilbildeKlikk(e);
        inputField.current.value = "";
    }
    
    return (
    <>
    <div className="profile-container" onClick={velgbehandler || undefined} style={{ boxShadow: valgt ? "var(--mint-green-shadow) 0px 4px 5px" : "", cursor: cursorEnabled ? "pointer" : "default" }}>
        <div className="profilbilde-wrapper">
            <div className="profilbilde-bakgrunn"
                onClick={ profilbildeKlikk ? () => inputField.current.click() : undefined }
                style={{ backgroundImage: `url(${profilbilde || defaultAvatar})` }}
            />
            </div>
                
    {profilbildeKlikk && 
    <input type="file" ref={inputField} style={{ display: "none" }} onChange={handleOnChangeProfile} />
    }

    <div className="profil-innhold">
    <div className="profil-typebehandler">{typeBehandler}<ShieldCheck style={{ color: "var(--mint-green)" }} strokeWidth={2} size={14} /></div>
    <div className="profil-brukernavn">{username}</div>
    <div className="profil-om">{`Erfaren ${typeBehandler} med bred faglig bakgrunn. Tilbyr skreddersydde behandlinger tilpasset dine behov.`}</div>        
    <div className={ `profil-valgt ${valgt ? "" : "profil-valgt-hide"}` }>Valgt behandler</div>

    </div>
    </div>
    </>
  )
}

export default ProfileCard