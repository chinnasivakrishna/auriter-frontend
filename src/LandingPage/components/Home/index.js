import React, { useRef, useState } from "react";
import "./Home.css";
import Companies from "../Companies";
import Faq from "../Faq";
import InovationTestimonial from "../InnovationTestimonial";
import SuperpowerTestimonial from "../SuperpowerTestimonial";
import demoImage from "../wmremove-transformed.png";
import demoVideo from "../Airuter.mp4";
import interviewProcess from "../images/Airuter-Support-Interview Journey.png";
import { Search, FileText, MessageCircle, Video } from 'lucide-react';

// Import company logos
import aitotaLogo from "../images/company-logos/aitota-logo.png";
import dailaiLogo from "../images/company-logos/dailai-logo.png";
import kitabaiLogo from "../images/company-logos/kitabai-logo.png";
import linguaaiLogo from "../images/company-logos/linguaai-logo.png";
import egclassesLogo from "../images/company-logos/egclasses-logo.png";
import mobishaalaLogo from "../images/company-logos/mobishaala-logo.png";
import prayogteaLogo from "../images/company-logos/prayogtea-logo.png";
import goldpotLogo from "../images/company-logos/goldpot-logo.png";

const testimonials = [
  {
    description: `🎯 "Finding top AI talent was a challenge—until we used Airuter! Its AI-powered candidate matching ensured we hired **highly skilled professionals** who were the perfect fit for our team."`,
    name: "Aitota",
    location: "Bengaluru, India",
    businessType: "AI Talent Matching",
    logo: aitotaLogo
  },
  {
    description: `📊 "Airuter's AI-driven **mock interviews** helped us identify candidates with **strong analytical skills and AI expertise**. The result? Faster, more efficient hiring!"`,
    name: "DailAI",
    location: "Noida, India",
    businessType: "AI Mock Interviews",
    logo: dailaiLogo
  },
  {
    description: `🧠 "With Airuter's **AI Resume Optimization and skill assessment tools**, we found **the best AI researchers and developers**, making our hiring process seamless!"`,
    name: "KitabAI",
    location: "Noida, India",
    businessType: "AI Resume Optimization",
    logo: kitabaiLogo
  },
  {
    description: `🎥 "Airuter's AI-driven **video interview analysis** helped us hire **the right communication experts**, ensuring candidates had the technical and linguistic skills we needed!"`,
    name: "LinguaAI",
    location: "Patna, India",
    businessType: "AI Video Interview Analysis",
    logo: linguaaiLogo
  },
  {
    description: `📚 "We needed qualified educators **fast**. Airuter's AI **profile matching and interview insights** helped us hire **skilled teachers** effortlessly!"`,
    name: "EG Classes",
    location: "Delhi, India",
    businessType: "AI Profile Matching for Educators",
    logo: egclassesLogo
  },
  {
    description: `⏱️ "Hiring teachers was time-consuming—until we used Airuter! Its AI instantly **identified top teaching candidates** and provided interview feedback, making recruitment smooth and efficient!"`,
    name: "Mobishaala",
    location: "Delhi, India",
    businessType: "AI Recruitment for Education",
    logo: mobishaalaLogo
  },
  {
    description: `🌱 "Airuter's AI-driven **skill evaluation** helped us hire **candidates with deep knowledge of sustainable practices**, ensuring they aligned with our company's mission!"`,
    name: "PrayogTea",
    location: "Delhi, India",
    businessType: "AI Skill Evaluation",
    logo: prayogteaLogo
  },
  {
    description: `💎 "Finding skilled jewelry designers was tough, but Airuter's **AI-powered recruitment** helped us match with **creative and technically proficient candidates** instantly!"`,
    name: "GoldPot Jewelry",
    location: "Bengaluru, India",
    businessType: "Creative Talent Recruitment",
    logo: goldpotLogo
  },
];

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
        <p>AI-POWERED SOLUTION</p>
        <h3>How AI Supports the Interview Journey</h3>
        <div className="subtitle">Complete support throughout your job search process</div>
      </div>
      
      <div className="InterviewProcessContent">
        <div className="InterviewProcessContentBox">
          <h4>
            <Search size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
            Discovering Opportunities
          </h4>
          <p>Job matching based on your resume and preferences, with alerts for roles that fit your skillset.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <FileText size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
            Resume & Profile Building
          </h4>
          <p>AI suggestions to refine your CV and showcase your qualifications and achievements.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <MessageCircle size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
            Pre-Interview Confidence Boost
          </h4>
          <p>Voice and body language guidance with last-minute confidence tips for preparation.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <Video size={18} style={{marginRight: '10px', color: '#6B46C1'}} />
            Live-Interview Support
          </h4>
          <p>Subtle real-time nudges during video interviews and on-screen transcription for accurate tracking.</p>
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
      {/* testimonial */}
      <section className="testimonialsContainers">
        <div className="testimonials-container">
          <div className="testimonials-scroll-wrapper">
            <h1>🚀 How Airuter's AI Transformed Hiring for Leading Companies!</h1>
            <div className="testimonials-scroll-container">
              {[...testimonials].map((testimonial, index) => (
                <div key={index} className="testimonial-cards">
                  <div className="testimonial-header">
                    <div className="testimonial-header-tag">
                      <h3>{testimonial.businessType}</h3>
                    </div>
                    <div className="testimonial-content">
                      <h3 className="testimonial-text">
                        {testimonial.description}
                      </h3>
                    </div>
                    <div className="testimonial-company-info">
                      <p className="testimonial-name">{testimonial.name} ({testimonial.location})</p>
                    </div>
                  </div>
                  <div className="company-logo-container">
                    <img
                      className="company-logo"
                      src={testimonial.logo || "https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company1.png"}
                      alt={`${testimonial.name} logo`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
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