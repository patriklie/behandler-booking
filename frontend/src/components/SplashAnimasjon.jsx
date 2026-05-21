import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import LoginPerson from "../assets/freepik__background__69816.webp"
import RegisterPerson from "../assets/3d-female-character-working-laptop-while-sitting-chair.webp"


const SplashAnimasjon = ({ children }) => {
    const [fase, setFase] = useState("inn");
    const [done, setDone] = useState(false)
    
    useEffect(() => {
        const images = [LoginPerson, RegisterPerson]
        images.forEach(src => {
            const img = new Image()
            img.src = src
        })
    }, [])
    
    useEffect(() => {
        const timer = setTimeout(() => setFase("ekspander"), 2000)
        return () => clearTimeout(timer)
    }, [])
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setDone(true)
        }, 2800)
        return () => clearTimeout(timer)
    }, [])
    
    return (
        <>
            
            {children}
    <AnimatePresence>

    {!done && (

        <motion.div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "fixed",
                overflow: "hidden",
                inset: 0,
                width: "100vw",
                height: "100dvh",
                backgroundColor: "white",
                zIndex: 9999,
            }}
            exit={{ opacity: 0 }}
        >

            {/* STROKE SIRKEL */}
            <motion.div
                style={{
                    width: 250,
                    height: 250,
                    background: "linear-gradient(to right, rgba(0, 110, 255, 0.48), rgba(0, 110, 255, 0.24))",
                    borderRadius: 200,
                    position: "absolute"
                }}
                initial={{
                    scale: 0,
                    rotate: 0
                }}
                animate={{
                    scale: 1,
                    rotate: 360
                }}
                transition={{
                    scale: { type: "spring", stiffness: 200, damping: 15, delay: 1.1 },
                    rotate: { duration: 2, ease: "linear", delay: 1.1 }
                }}

            ></motion.div>

            {/* BLÅ SIRKEL */}
            <motion.div
                style={{
                    width: 210,
                    height: 210,
                    backgroundColor: "var(--primary-color)",
                    borderRadius: 200,
                    position: "absolute"
                }}
                initial={{
                    scale: 0,
                }}

                animate={fase === "ekspander" ? { scale: 20 } : { scale: 1 }}

                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: fase === "ekspander" ? .5 : 1
                }}
            ></motion.div>

            {/* HELSEKORS LIGGENDE */}
            <motion.div
                style={{
                    width: 140,
                    height: 50,
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    position: "absolute"
                }}
            ></motion.div>

            {/* HELSEKORS STÅENDE */}
            <motion.div
                style={{
                    width: 140,
                    height: 50,
                    backgroundColor: "#FFF",
                    borderRadius: 10,
                    rotate: 90,
                    position: "absolute"
                }}
            ></motion.div>

            {/* H CONTAINER */}
            <motion.div
                style={{
                    width: 200,
                    height: 200,
                    position: "relative",
                }}
            >

                {/* H - Strek venstre */}
                <motion.div
                    style={{
                        width: 15,
                        height: 110,
                        left: 60,
                        top: "50%",
                        y: "-50%",
                        backgroundColor: "var(--primary-color)",
                        position: "absolute"
                                }}             
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}                                   
                />

                {/* H - Strek høyre */}
                <motion.div
                    style={{
                        width: 15,
                        height: 110,
                        right: 60,
                        top: "50%",
                        y: "-50%",
                        backgroundColor: "var(--primary-color)",
                        position: "absolute"
                                }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}   
                />
                            
                {/* H Skråstrek */}
                <motion.div
                    style={{
                        width: 15,
                        height: 90,
                        backgroundColor: "var(--primary-color)",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        x: "-50%",
                        y: "-50%",
                        rotate: 45,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}       
                />

            </motion.div>


        </motion.div>

    )}

    </AnimatePresence>
        
     
            
    </>
  )
}

export default SplashAnimasjon