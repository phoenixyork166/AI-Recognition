import React from "react";
import ReactDOM from "react-dom";
import Tilt from "react-parallax-tilt";
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br2 shadow2" options={{ max: 55 }} style={{ height: "150px", width: "150px", backgroundColor: "purple" }}>
        <div className="Tilt-inner">
            <img src={brain} alt="the brain" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;