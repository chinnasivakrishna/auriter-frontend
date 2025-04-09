import React from "react";
import "./Home.css";
import Companies from "../Companies";
import Faq from "../Faq";
import InovationTestimonial from "../InnovationTestimonial";
import SuperpowerTestimonial from "../SuperpowerTestimonial";
import demoImage from "../wmremove-transformed.png";
import demoVideo from "../Airuter.mp4";
import interviewProcess from "../images/Airuter-Support-Interview Journey.png";
const testimonials = [
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Airuter, I felt much more confident in my interview approach, which led to my offer in project management.`,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
];

export default function Home() {
  // const [searchQuery, setSearchQuery] = useState("");
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

          <button className="cta-button">Get In Touch</button>

          
          <p className="subtitle">
          Meet your AI hiring assistant – from resume creation to real-time video interview, Airuter empowers you to stand out and get hired.
          </p>

        </div>
        <div className="demo-content">
          {/* <div className="demo-features">
          <div className="feature">
            <span>Seamless connection to any interview meeting software</span>
          </div>
          <div className="feature">
            <span>Real-time transcription from interviewer</span>
          </div>
          <div className="feature">
          <span>Real-time and personalized suggestions for answers</span>
          </div>
          </div> */}
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
                <p>From Day One to Final Rounds</p>
                <h3>
                Your Interview Journey, Supercharged by AI 🚀
                From resume creation to final follow-up, Airuter supports every step with smart AI tools—helping you stay confident, prepared, and always interview-ready.
                </h3>
              </div>
            </div>
            <div className="InterviewProcess">
              <img src={interviewProcess} alt="Interview interface demo" />
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
                <h2>AI-powered partner for every step of the hiring journey</h2>
              </div>
              <div>
                <ul className="InterviewProcessList2">
                  <li>
                    <div>
                      <h3>Ace Every Step of Your Interview Journey with AI </h3>
                      <p>
                      From building standout resumes and preparing smarter to acing interviews with real-time guidance and post-interview insights.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>Always Interview-Ready, Whether You're a Fresher or a Pro</h3>
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
                src={demoVideo} 
                autoPlay 
                muted
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
        <div className="InterviewProcessHeader">
          <p>From Day One to Final Rounds</p>
          <h2>
            A suite of AI tools to navigate through this difficult recruiting
            season
          </h2>
        </div>
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