"use client";

import { useEffect, useRef } from "react";
import "./Companies.css";
import kashiAI from "../images/KASHI AI LOGO.jpg";
import aitota from "../images/aitota__logo.png";
import britishLingua from "../images/British Lingua.png";
import dailAi from "../images/DailAi_Logo.png";
import kitabAI from "../images/KitabAI.png";
import mobishaala from "../images/Mobishaala White.png";
import GitPot from "../images/GotPot-Logo.jpg";
import wizzmedia from "../images/WIZZMEDIA_LOGO.png";

export default function CompanyShowcase() {
  // Define company data with logos and names
  const companies = [
    { logo: kashiAI, name: "Kashi AI", alt: "Kashi AI Logo" },
    { logo: aitota, name: "AI Tota", alt: "AI Tota Logo" },
    { logo: britishLingua, name: "British Lingua", alt: "British Lingua Logo" },
    { logo: dailAi, name: "Dail AI", alt: "Dail AI Logo" },
    { logo: kitabAI, name: "Kitab AI", alt: "Kitab AI Logo" },
    { logo: mobishaala, name: "Mobishaala", alt: "Mobishaala Logo" },
    { logo: GitPot, name: "GitPot", alt: "GotPot Logo" },
    { logo: wizzmedia, name: "Wizzmedia", alt: "Wizzmedia Logo" },
  ];

  const containerRef = useRef(null);
  const REPETITIONS = 100; // Number of times to repeat the companies array

  // Create a large array of repeated companies
  const repeatedCompanies = Array(REPETITIONS).fill().flatMap(() => companies);

  // Optional: Check if we need to adjust for any gaps
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // This ensures the container width is properly calculated
      const firstGroupWidth = container.children[0].offsetWidth * companies.length + 
                              (4 * (companies.length - 1)); // account for gap
      
      // Set a custom property that can be used in the CSS
      document.documentElement.style.setProperty('--scroll-width', `${firstGroupWidth}px`);
    }
  }, []);

  return (
    <div className="heros-container">
      <h1 className="heros-heading">
        Trusted Partners
      </h1>

      <div className="logos-scroll">
        <div className="logos-container" ref={containerRef}>
          {/* Render the repeated companies array */}
          {repeatedCompanies.map((company, index) => (
            <div key={index} className="company-item">
              <img
                src={company.logo}
                alt={company.alt}
                className="logo"
              />
              <p className="company-name">{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}