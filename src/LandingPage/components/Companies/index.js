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
  
  const scrollRef = useRef(null);
  
  // Manual animation with requestAnimationFrame for better control
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let scrollPosition = 0;
    const scrollSpeed = 1; // Adjust speed as needed
    
    // Create a duplicate set of all company items for infinite scrolling
    const originalItems = Array.from(scrollContainer.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      scrollContainer.appendChild(clone);
    });
    
    // Get the width of a single set of company items
    const firstItemsWidth = originalItems.reduce((total, item) => total + item.offsetWidth, 0) + 
                         (originalItems.length - 1) * parseInt(getComputedStyle(scrollContainer).columnGap || '0');
    
    const animate = () => {
      scrollPosition += scrollSpeed;
      
      // Reset position when we've scrolled through one full set
      if (scrollPosition >= firstItemsWidth) {
        scrollPosition = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollPosition}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationFrame = requestAnimationFrame(animate);
    
    // Cleanup animation on unmount
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="heros-container">
      <h1 className="heros-heading">
        Trusted Partners
      </h1>

      <div className="logos-scroll">
        <div className="logos-container" ref={scrollRef}>
          {companies.map((company, index) => (
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