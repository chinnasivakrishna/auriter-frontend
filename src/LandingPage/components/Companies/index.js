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
  
  const scrollContainerRef = useRef(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    // Get all company items
    const companyItems = scrollContainer.querySelectorAll('.company-item');
    if (companyItems.length === 0) return;
    
    // Create a second container for clone items
    const cloneContainer = document.createElement('div');
    cloneContainer.className = 'logos-container';
    scrollContainer.appendChild(cloneContainer);
    
    // Clone each item and add to the clone container
    companyItems.forEach(item => {
      const clone = item.cloneNode(true);
      cloneContainer.appendChild(clone);
    });
    
    // Function to handle the infinite scroll
    let animationId;
    let position = 0;
    const scrollSpeed = 1; // Adjust for faster/slower scroll
    
    // Calculate width of first container
    const containerWidth = companyItems[0].parentElement.getBoundingClientRect().width;
    
    function infiniteScroll() {
      position += scrollSpeed;
      
      // Reset position when we've scrolled one container width
      if (position >= containerWidth) {
        position = 0;
      }
      
      // Apply the transform
      scrollContainer.style.transform = `translateX(-${position}px)`;
      
      // Continue the animation
      animationId = requestAnimationFrame(infiniteScroll);
    }
    
    // Start the animation
    animationId = requestAnimationFrame(infiniteScroll);
    
    // Cleanup on unmount
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);
  
  return (
    <div className="heros-container">
      <h1 className="heros-heading">
        Trusted Partners
      </h1>

      <div className="logos-scroll">
        <div className="logos-track" ref={scrollContainerRef}>
          <div className="logos-container">
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
    </div>
  );
}