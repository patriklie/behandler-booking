import { motion, useMotionValue, useTransform, animate, useMotionValueEvent, useAnimationControls, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { BadgeCheck, Calendar, CalendarClock, CalendarX, Clock, Trash2 } from "lucide-react";

const PasientTimeCelle = ({ time, formatertDato, dagerTilTime, avlysTime }) => {
    const x = useMotionValue(0);
    const swipeDistance = 120;
    const bakgrunnsfarge = useTransform(x, [0, -swipeDistance], ["#ffffff", "#ff4444"]);
    const ikonSize = useTransform(x, [0, -swipeDistance], [1, 2]);
    const ikonOpacity = useTransform(x, [0, -swipeDistance], [0, 1]);
    const tekstPosition = useTransform(x, [0, -swipeDistance * 2], ["150px", "75px"]);
    const [visIkon, setVisIkon] = useState(true);
    const ikonControls = useAnimationControls();
    const [harNudget, setHarNudget] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [erOverSwipe, setErOverSwipe] = useState(false);
    
    
    const handleTap = () => {
        if (harNudget) return;
        if (isDragging) return;
        setHarNudget(true);

        animate(x, [0, -280, 0], {
            duration: 1.8,
            ease: "easeInOut"
        });
    };
    
    useEffect(() => {
        if (erOverSwipe) {
            ikonControls.start({
                rotate: [0, -10, 10, -10, 10, 0],
                transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            });
        } else {
            ikonControls.start({
                rotate: 0,
                transition: { duration: 0.1 }
            });
        }
    }, [erOverSwipe]);

    useMotionValueEvent(x, "change", (latest) => {
        const erOver = latest <= -swipeDistance;

        if (erOver !== erOverSwipe) {
            setErOverSwipe(erOver);
        }
    });
    
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
                onTap={handleTap} 
                dragElastic={0.1}
                transition={{ type: "spring" }}
                style={{ x, backgroundColor: bakgrunnsfarge }}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event, info) => {
                    setIsDragging(false);

                    const SWIPE_THRESHOLD = 120;

                    const harSwipet =
                        info.offset.x <= -SWIPE_THRESHOLD || info.velocity.x <= -500;

                    if (harSwipet) {
                        animate(x, -window.innerWidth, {
                            duration: 0.5,
                            onComplete: async () => {
                                setVisIkon(false);
                                await avlysTime(time._id);
                                console.log("Avlys timen funksjon.");
                            }
                        });
                    } else {
                        animate(x, 0, {
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        });
                    }
                }}
            >
                
                {dagerTilTime > 1 ?
                    <div className="dager-banner">
                <CalendarClock size={30} strokeWidth={1.2} />
                <div>{dagerTilTime} dager</div>
                </div> : ""
                }
                
                {dagerTilTime === 1 ?
                    <div className="dager-banner">
                <CalendarClock size={30} strokeWidth={1.2} />
                <div>{dagerTilTime} dag</div>
                </div> : ""
                }
                
                {dagerTilTime === "0" ?
                    <div div className="dager-banner">
                        <CalendarClock size={30} strokeWidth={1.2} />
                        <div>I dag!</div>
                    </div> : ""
                }

                
                <div className="pasientTime-grid-celle">
                    <div className="pasientTime-profilbilde" style={{ backgroundImage: `url(${time.behandler.profilbilde})` }}>
                    </div>  
                </div>
                
                <div className="pasientTime-grid-celle innhold">
                    <div className="stor-forbokstav pasienttime-type-behandler">{time.behandler.typeBehandler}</div>
                    <div className="pasienttime-behandler-navn">{time.behandler.username}</div>
                    
                    <div className="pasientTime-ikon-flex">
                        <div className="icon-pair">
                            <Clock strokeWidth={2} size={18} />
                            <div>{time.startTid} - {time.sluttTid}</div>
                        </div>
                        <div className="icon-pair">
                            <Calendar strokeWidth={2} size={18} />
                            <div>{formatertDato}</div>
                        </div>
                    </div>
                    
                    
                    
                    
                    <div>Ikke betalt {time.pris},-</div>
                </div>
                
 
            </motion.div>

        </div>
    )
}

export default PasientTimeCelle;