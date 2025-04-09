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

const testimonials = [
  {
    description: `🎯 Airuter’s AI Resume Builder didn’t just format my resume—it optimized it! The AI analyzed industry trends and tailored suggestions to make my application stand out. Within weeks, I landed my dream job!`,
    name: "Priya – Digital Marketing (Bangalore, India)",
    businessType: "AI Resume Builder",
  },
  {
    description: `🎥 I had never faced a video interview before, but Airuter’s AI-powered mock interviews changed everything! The system analyzed my tone, body language, and response structure, giving me real-time insights. Thanks to this, I aced my interview!`,
    name: "Aditya – Software Developer (Hyderabad, India)",
    businessType: "AI Video Interview",
  },
  {
    description: `🧠 Airuter’s AI-driven mock interviews pinpointed my weak spots with laser accuracy. Whether it was improving my communication or technical responses, the platform’s feedback was incredibly precise. This personalized approach helped me secure my role!`,
    name: "Neelam – Data Analyst (Pune, India)",
    businessType: "AI-Powered Mock Interviews",
  },
  {
    description: `⚡ Searching for jobs used to be frustrating, but Airuter’s AI Profile Matching changed the game! It scanned my skills and career goals, instantly connecting me with relevant job opportunities. The result? A perfect job match in no time!`,
    name: "Vaibhav – Full-Stack Developer (Mumbai, India)",
    businessType: "AI Profile Matching",
  },
  {
    description: `📈 Airuter’s AI-powered learning system identified gaps in my skills and recommended focused upskilling. This targeted approach helped me refine my UX/UI expertise quickly, leading to my dream job!`,
    name: "Sushma – UX/UI Designer (Delhi, India)",
    businessType: "AI-Driven Skill Enhancement",
  },
  {
    description: `🔍 After each mock interview, Airuter’s AI-generated feedback was incredibly detailed. It didn’t just highlight mistakes—it provided actionable solutions! This made it easy to improve and boosted my confidence for real interviews.`,
    name: "Khushboo – Content Strategist (Kolkata, India)",
    businessType: "Smart AI Feedback",
  },
  {
    description: `📊 Airuter’s AI went beyond generic advice—it gave me data-backed insights on how to refine my resume, improve my interview technique, and showcase leadership skills. The AI-driven guidance made all the difference in landing my product management role!`,
    name: "Samarjeet – Product Manager (Chennai, India)",
    businessType: "AI Career Guidance",
  },
  {
    description: `🔗 Traditional job searches felt overwhelming, but Airuter’s AI streamlined the process! It analyzed my strengths, preferences, and market trends to match me with the right companies. This smart matching system helped me land my ideal job quickly!`,
    name: "Preeti – Marketing Strategist (Jaipur, India)",
    businessType: "AI-Powered Networking",
  },
  {
    description: `🚀 The AI mock interviews were next-level! They didn’t just assess my answers—they provided in-depth analysis of my problem-solving approach and communication. This real-time feedback gave me a competitive edge and helped me secure my data scientist role!`,
    name: "Shubham – Data Scientist (Ahmedabad, India)",
    businessType: "Real-Time AI Feedback",
  },
];



export default function Home() {
  // For video unmute functionality
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

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
            <i className="fas fa-search" style={{marginRight: '10px', color: '#6B46C1'}}></i>
            Discovering Opportunities
          </h4>
          <p>Job matching based on your resume and preferences, with alerts for roles that fit your skillset.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <i className="fas fa-file-alt" style={{marginRight: '10px', color: '#6B46C1'}}></i>
            Resume & Profile Building
          </h4>
          <p>AI suggestions to refine your CV and showcase your qualifications and achievements.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <i className="fas fa-comments" style={{marginRight: '10px', color: '#6B46C1'}}></i>
            Pre-Interview Confidence Boost
          </h4>
          <p>Voice and body language guidance with last-minute confidence tips for preparation.</p>
        </div>
        
        <div className="InterviewProcessContentBox">
          <h4>
            <i className="fas fa-video" style={{marginRight: '10px', color: '#6B46C1'}}></i>
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
                    <p className="testimonial-name">{testimonial.name}</p>
                  </div>
                  <img
                    className="company-logo"
                    src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/questionBank/company1.png"
                  />
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