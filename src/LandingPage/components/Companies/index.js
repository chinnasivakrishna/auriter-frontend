"use client";

import { useEffect, useRef } from "react";
import "./Companies.css";
import kashiAI from "../images/KASHI AI LOGO.jpg";
import aitota from "../images/aitota_logo.png";
import britishLingua from "../images/British Lingua.png";
import dailAi from "../images/DailAi_Logo.jpg";
import kitabAI from "../images/KitabAI_Logo.png";
import mobishaala from "../images/Mobishaala White.png";
import GitPot from "../images/GitPot-LOGO.jpg";
import wizzmedia from "../images/WIZZMEDIA_Logo.png";

export default function CompanyShowcase() {
  return (
    <div className="heros-container">
      <h1 className="heros-heading">
        Trusted Partners
      </h1>

      <div className="logos-scroll">
        <div className="logos-container">
          <img
            src={kashiAI}
            alt="Kashi AI Logo"
            className="logo"
          />
          <img
            src={aitota}
            alt="AI Tota Logo"
            className="logo"
          />
          <img
            src={britishLingua}
            alt="British Lingua Logo"
            className="logo"
          />
          <img
            src={dailAi}
            alt="Dail AI Logo"
            className="logo"
          />
          <img
            src={kitabAI}
            alt="Kitab AI Logo"
            className="logo"
          />
          <img
            src={mobishaala}
            alt="Mobishaala Logo" 
            className="logo"
          />
          <img
            src={GitPot}
            alt="GitPot Logo"
            className="logo"
          />
          <img
            src={wizzmedia}
            alt="Wizzmedia Logo"
            className="logo"
          />
          {/* Duplicate logos for continuous scroll effect */}
          <img
            src={kashiAI}
            alt="Kashi AI Logo"
            className="logo"
          />
          <img
            src={aitota}
            alt="AI Tota Logo"
            className="logo"
          />
          <img
            src={britishLingua}
            alt="British Lingua Logo"
            className="logo"
          />
          <img
            src={dailAi}
            alt="Dail AI Logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}