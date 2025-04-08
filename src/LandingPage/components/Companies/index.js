"use client";

import { useEffect, useRef } from "react";
import "./Companies.css";

export default function CompanyShowcase() {
  //   const containerRef = useRef < HTMLDivElement > null;
  //   const contentRef = useRef < HTMLDivElement > null;

  //   useEffect(() => {
  //     if (containerRef.current && contentRef.current) {
  //       // Clone the content for seamless infinite scroll
  //       const clone = contentRef.current.cloneNode(true);
  //       containerRef.current.appendChild(clone);
  //     }
  //   }, []);

  return (
    <div className="heros-container">
      <h1 className="heros-heading">
        300,000+ offers from the most exciting companies and organizations
      </h1>

      {/* <div className="logo-scroll" ref={containerRef}> */}
      <div className="logos-scroll">
        {/* <div className="logo-container" ref={contentRef}> */}
        <div className="logos-container">
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
          <img
            src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/companies/airbnb_logo.svg"
            alt="TikTok Logo"
            className="logo"
          />
        </div>
      </div>
    </div>
  );
}
