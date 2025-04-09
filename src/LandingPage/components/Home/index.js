import React, { useRef } from "react";
import "./Home.css";
import Companies from "../Companies";
import Faq from "../Faq";
import InovationTestimonial from "../InnovationTestimonial";
import SuperpowerTestimonial from "../SuperpowerTestimonial";
import TestimonialsScroll from "../TestimonialsScroll"; // Import the new component
import SuccessStories from "../SuccessStories"; // Import the new Success Stories component
import demoImage from "../wmremove-transformed.png";
import demoVideo from "../Airuter.mp4";
import interviewProcess from "../images/Airuter-Support-Interview Journey.png";
import { Search, FileText, MessageCircle, Video, TrendingUp, Clock, Users } from 'lucide-react';
import image1 from "../images/image1.png";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import image4 from "../images/image4.png";

export default function Home() {
  const videoRef = useRef(null);

  const handleGetInTouch = () => {
    const whatsappUrl = "https://web.whatsapp.com/send/?phone=8147540362&text=Hello%20Airuter%20team%20,%20I%20want%20to%20use%20Airuter%20service,%20%20my%20name%20is";
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Screening Talent with AI,
            <br />
            Matching Potential with Opportunity.
          </h1>

          <div className="metrics">
            <div className="metric">
              <span className="metric-value">2K+</span>
              <span className="metric-label">Offers Received</span>
            </div>
            <div className="separator"></div>
            <div className="metric">
              <span className="metric-value">12K+</span>
              <span className="metric-label">Interviews Aced</span>
            </div>
          </div>

          <div className="button-container">
            <button className="cta-button" onClick={handleGetInTouch}>Get In Touch</button>
            <button className="try-free-button">Try for Free</button>
          </div>

          <p className="subtitle">
            Meet your AI hiring assistant – from resume creation to real-time video interview, Airuter empowers you to stand out and get hired.
          </p>
        </div>
        <div className="hero-image-container">
          <div className="demo-image">
            <img
              src={demoImage}
              alt="Interview interface demo"
            />
          </div>
        </div>
      </section>
      
      <Companies />
      
      <div style={{ position: "relative" }}>
        <section className="InterviewProcessContainerSection">
          <div className="InterviewProcessContainer">
            <div className="InterviewProcessText">
              <div className="InterviewProcessHeader">
                <h3>How AI Supports the Interview Journey</h3>
              </div>
              
              <div className="InterviewProcessContent">
                <div className="InterviewProcessContentBox">
                  <h4>
                    <Search size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
                    Discovering Opportunities
                  </h4>
                  <div className="content-image-container">
                    <img 
                      src={image1} 
                      alt="Discovering Opportunities" 
                      className="content-image"
                    />
                  </div>
                </div>
                
                <div className="InterviewProcessContentBox">
                  <h4>
                    <FileText size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
                    Resume & Profile Building
                  </h4>
                  <div className="content-image-container">
                    <img 
                      src={image2} 
                      alt="Resume & Profile Building" 
                      className="content-image"
                    />
                  </div>
                </div>
                
                <div className="InterviewProcessContentBox">
                  <h4>
                    <MessageCircle size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
                    Pre-Interview Confidence Boost
                  </h4>
                  <div className="content-image-container">
                    <img 
                      src={image3} 
                      alt="Pre-Interview Confidence Boost" 
                      className="content-image"
                    />
                  </div>
                </div>
                
                <div className="InterviewProcessContentBox">
                  <h4>
                    <Video size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
                    Live-Interview Support
                  </h4>
                  <div className="content-image-container">
                    <img 
                      src={image4} 
                      alt="Live-Interview Support" 
                      className="content-image"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="InterviewProcess">
              <img src={interviewProcess} alt="Interview journey visualization" />
            </div>
          </div>
        </section>
        
        {/* Add spacing between sections */}
        <div style={{ margin: "20px 0" }}></div>
        
        {/* Success Stories Section */}
        <SuccessStories />
        
        <section
          className="InterviewProcessContainerSection"
          style={{ marginBottom: "40px" }}
        >
          <div className="InterviewProcessContainer2">
            <div className="InterviewProcessLeft2">
              <div className="InterviewProcessHeaderContainer2">
                <h2><strong>AI-powered partner for every step of the hiring journey</strong></h2>
              </div>
              <div>
                <ul className="InterviewProcessList2">
                  <li>
                    <div>
                      <h3><strong>Ace Every Step of Your Interview Journey with AI</strong></h3>
                      <p>
                        From building standout resumes and preparing smarter to acing interviews with real-time guidance and post-interview insights.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3><strong>Always Interview-Ready, Whether You're a Fresher or a Pro</strong></h3>
                      <p>
                        Airuter is your AI-powered companion designed to help you succeed in today's competitive job market.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="InterviewProcessRight2">
              <video 
                ref={videoRef}
                src={demoVideo} 
                autoPlay 
                playsInline
                loop
                controls
              />
            </div>
          </div>
        </section>
      </div>
      
      {/* Testimonials section */}
      <TestimonialsScroll />
      
      <Faq />
      
      <section style={{ padding: "10px" }}>
        <InovationTestimonial />
      </section>
      
      <section>
        <SuperpowerTestimonial />
      </section>
    </>
  );
}