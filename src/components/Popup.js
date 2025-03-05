"use client";

import React, { useState } from "react";
import { X } from "react-feather";
import "./popup.css";

const Popup = ({ children }) => {
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Toggle Popup State
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="taCenter">
        <h3>Are You Listed?</h3>
        <div className="example_d" onClick={togglePopup}>
          Click For More Info
        </div>
      </div>

      {showPopup && (
        <div className="Popup-Overlay">
          <div className="Popup-Background" onClick={togglePopup}></div>
          <div className="Popup-Inner">
            <X className="Popup-Close" onClick={togglePopup} />
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
