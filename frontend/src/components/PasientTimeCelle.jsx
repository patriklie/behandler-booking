import { motion, useMotionValue, useTransform, animate, useMotionValueEvent, useAnimationControls, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CalendarX, Trash2 } from "lucide-react";

const PasientTimeCelle = ({ time, formatertDato, dagerTilTime }) => {
    const x = useMotionValue(0);
    const bakgrunnsfarge = useTransform(x, [0, -(window.innerWidth * 0.5)], ["#ffffff", "#ff4444"]);
    const ikonSize = useTransform(x, [0, -(window.innerWidth * 0.5)], [1, 2]);
    const ikonOpacity = useTransform(x, [0, -(window.innerWidth * 0.25)], [0, 1]);
    const tekstPosition = useTransform(x, [0, -(window.innerWidth)], ["150px", "75px"]);
    const [visIkon, setVisIkon] = useState(true);
    const ikonControls = useAnimationControls();

    useMotionValueEvent(x, "change", (latest) => {
        const terskel = -(window.innerWidth * 0.5)
        if (latest <= terskel) {
            ikonControls.start({
                rotate: [0, -10, 10, -10, 10, 0],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            })
        } else {
            ikonControls.start({
                rotate: 0,
                transition: { duration: 0.1, ease: "easeInOut" }
            })
        }
    })
    
    return (
        <div className="pasientTime-wrapper">
            {visIkon &&
            <>
                <motion.div
                    className="bak-timecelle-ikon"
                    style={{ scale: ikonSize, opacity: ikonOpacity }}
                    animate={ikonControls}
                >
                    <CalendarX strokeWidth={1} />
                </motion.div>
                <motion.div
                    className="bak-timecelle-tekst"
                    style={{ right: tekstPosition }}
                
                >
                    AVLYS TIMEN
                </motion.div>
            </>
            }
            
            <motion.div
                className="pasientTime-celle"
                drag="x"
                dragConstraints={{ right: 0 }}
                dragElastic={0.1}
                transition={{ type: "spring" }}
                style={{ x, backgroundColor: bakgrunnsfarge}}
                onDragEnd={(event, info) => {
                    const terskel = window.innerWidth * 0.5
                    if (info.offset.x <= -terskel) {
                        animate(x, -window.innerWidth, {
                            duration: 0.1,
                            onComplete: () => {
                                setVisIkon(false);
                            console.log("Avlys timen funksjon.")
                            }
                        })
                    } else {
                        animate(x, 0, { type: "spring", stiffness: 300, damping: 20 })
                    }
                }}
            >
                <div className="pasientTime-grid-celle">
                    <div>{time.behandler.username}</div>
                    <div>{time.startTid} - {time.sluttTid}</div>
                </div>
                
                <div className="pasientTime-grid-celle">
                    <div>{dagerTilTime} dager til</div>
                    <div>{time.behandler.typeBehandler}</div>
                </div>

 
            </motion.div>

        </div>
    )
}

export default PasientTimeCelle;