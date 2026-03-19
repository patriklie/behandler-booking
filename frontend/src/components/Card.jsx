import { Link } from "react-router";
import { motion } from "motion/react";

const Card = ({ children, icon, style, image, title, button, buttonIcon, buttonLink }) => {
  return (
    <>
      <div className="card-container" style={style}>
        {icon && <div className="icon-container">{icon}</div>}
        <div className="card-title-small">{title}</div>
        {children}

        <div className="graphic-container">
          <div className="box"></div>
        </div>
        {image && <motion.img
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", delay: 0.4, duration: 1.5, damping: 10, stiffness: 200 }}
          
          src={image}
          className="card-image" />}

				{button && <Link to={buttonLink} className="card-btn">{button}{buttonIcon}</Link>}
      </div>
    </>
  );
};

export default Card;
