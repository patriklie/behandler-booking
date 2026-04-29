import { motion, useTransform, useMotionValue, animate } from "motion/react"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAppStore } from "../store/authStore";
import toast from "react-hot-toast";

const DrawerPasientTime = ({ closeDrawer }) => {
    
    const y = useMotionValue(0);
    const swipeAvstand = 150;
    const overlayOpacity = useTransform(y, [0, swipeAvstand], [1, 0]);
    const token = useAppStore((state) => state.token);
    
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
     
    return (
    <>
        <motion.div
            className="pasienttime-drawer-overlay"
            onClick={handleClose}
            style={{ opacity: overlayOpacity }}
        >
                
        </motion.div>
            
        <motion.div
            className="pasienttime-drawer-panel"
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
                <div className="pasienttimek-drawer-drag-wrapper">
                    <div className="pasienttime-drawer-drag"></div>
            </div>

           
                
              
                
            </motion.div>
            

    </>

  )
}

export default DrawerPasientTime;