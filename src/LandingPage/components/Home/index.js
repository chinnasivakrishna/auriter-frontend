import React, { useState } from "react";
// import "../utils/globals.css";
import Companies from "../Companies";
import "./Home.css";
import Faq from "../Faq";
import InovationTestimonial from "../InnovationTestimonial";
import SuperpowerTestimonial from "../SuperpowerTestimonial";
const testimonials = [
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
    name: "James Matthews, Project Manager at IBM",
    businessType: "software",
  },
  {
    description: `Using Final Round AI, I felt much more confident in my interview approach, which led to my offer in project management. `,
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
            Unlock Your Interview Superpowers with AI,
            <br />
            Your AI-Powered Interview Copilot
          </h1>

          <div className="metrics">
            <div className="metric">
              <span className="metric-value">250K+</span>
              <span className="metric-label">Offers Received</span>
            </div>
            <div className="separator"></div>
            <div className="metric">
              <span className="metric-value">1.2M+</span>
              <span className="metric-label">Interviews Aced</span>
            </div>
          </div>

          <button className="cta-button">Activate AI Interview Mode Now</button>

          <p className="subtitle">
            Interview Copilot™ generating actionable guidance for interviews in
            real-time
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-03BmhKbukEVuYlqt0rEFJMwrvhbuu4.png"
              alt="Interview interface demo"
            />
          </div>
        </div>
      </section>
      <Companies />
      <div style={{ position: "relative" }}>
        <section className="InterviewProcessContainerSection">
          <div className="InterviewProcessContainer">
            <div className="InterviewProcessHeader">
              <p>From Day One to Final Rounds</p>
              <h2>
                A suite of AI tools to navigate through this difficult
                recruiting season
              </h2>
            </div>
            <div className="InterviewProcess">
              <ul className="InterviewProcessList">
                <li>
                  <h3>Before Interview</h3>
                </li>
                <li>AI Resume Builder</li>
                <li>AI Interview Copilot</li>
              </ul>
              <span className="separators"></span>
              <ul className="InterviewProcessList">
                <li>
                  <h3>During Interview</h3>
                </li>
                <li>Interview Copilot™</li>
                <li>Real-Time Transcription</li>
                <li>AI Interview Copilot</li>
              </ul>
              <span className="separators"></span>
              <ul className="InterviewProcessList">
                <li>
                  <h3>After Interview</h3>
                </li>
                <li>Interview Copilot™</li>
                <li>Real-Time Transcription</li>
                <li>AI Interview Copilot</li>
              </ul>
            </div>
          </div>
        </section>
        <section
          className="InterviewProcessContainerSection"
          style={{ marginBottom: "40px" }}
        >
          <div className="InterviewProcessContainer2">
            <div className="InterviewProcessLeft2">
              <div className="InterviewProcessHeaderContainer2">
                <div className="InterviewProcessHeader2">
                  <h3>AI Resume Builder</h3>
                </div>
                <h2>Generate a hireable resume with ease in one-click</h2>
              </div>
              <div>
                <ul className="InterviewProcessList2">
                  <li>
                    <div>
                      <h3>ATS Optimized</h3>
                      <p>
                        Designed to ensure ATS optimization so your credentials
                        stand out to top employers and pass machine screening
                        process.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div>
                      <h3>ATS Optimized</h3>
                      <p>
                        Designed to ensure ATS optimization so your credentials
                        stand out to top employers and pass machine screening
                        process.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <a className="cta-button2" href="#">
                  Launch Resume Builder
                </a>
              </div>
            </div>
            <div className="InterviewProcessRight2">
              <img src="https://d12araoe7z5xxk.cloudfront.net/landing-page/images/sticky-tabs/ats-optimized.webp" />
            </div>
          </div>
        </section>

        {/* <div
          style={{
            height: "100vh",
            fontSize: "3rem",
            position: "sticky",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            top: 80,
          }}
        >
          3
        </div> */}
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
