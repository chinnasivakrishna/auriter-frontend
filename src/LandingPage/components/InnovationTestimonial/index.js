"use client";

import { useState } from "react";
import "./InnovationTestimonial.css";

export default function InnovationTestimonial() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "Airuter's AI Resume Builder didn't just format my resume—it optimized it! The AI analyzed industry trends and tailored suggestions to make my application stand out. Within weeks, I landed my dream job!",
      author: "Priya",
      position: "Digital Marketing",
      location: "Bangalore, India",
      feature: "AI Resume Builder – A Game Changer!"
    },
    {
      quote: "I had never faced a video interview before, but Airuter's AI-powered mock interviews changed everything! The system analyzed my tone, body language, and response structure, giving me real-time insights. Thanks to this, I aced my interview!",
      author: "Aditya",
      position: "Software Developer",
      location: "Hyderabad, India",
      feature: "AI Video Interview – Confidence Booster!"
    },
    {
      quote: "Airuter's AI-driven mock interviews pinpointed my weak spots with laser accuracy. Whether it was improving my communication or technical responses, the platform's feedback was incredibly precise. This personalized approach helped me secure my role!",
      author: "Neelam",
      position: "Data Analyst",
      location: "Pune, India",
      feature: "AI-Powered Mock Interviews – Precision Feedback!"
    },
    {
      quote: "Searching for jobs used to be frustrating, but Airuter's AI Profile Matching changed the game! It scanned my skills and career goals, instantly connecting me with relevant job opportunities. The result? A perfect job match in no time!",
      author: "Vaibhav",
      position: "Full-Stack Developer",
      location: "Mumbai, India",
      feature: "AI Profile Matching – Job Hunting Simplified!"
    },
    {
      quote: "Airuter's AI-powered learning system identified gaps in my skills and recommended focused upskilling. This targeted approach helped me refine my UX/UI expertise quickly, leading to my dream job!",
      author: "Sushma",
      position: "UX/UI Designer",
      location: "Delhi, India",
      feature: "AI-Driven Skill Enhancement – Fast-Track to Success!"
    },
    {
      quote: "After each mock interview, Airuter's AI-generated feedback was incredibly detailed. It didn't just highlight mistakes—it provided actionable solutions! This made it easy to improve and boosted my confidence for real interviews.",
      author: "Khushboo",
      position: "Content Strategist",
      location: "Kolkata, India",
      feature: "Smart AI Feedback – Personalized Career Growth!"
    },
    {
      quote: "Airuter's AI went beyond generic advice—it gave me data-backed insights on how to refine my resume, improve my interview technique, and showcase leadership skills. The AI-driven guidance made all the difference in landing my product management role!",
      author: "Samarjeet",
      position: "Product Manager",
      location: "Chennai, India",
      feature: "AI Career Guidance – A Personalized Roadmap!"
    },
    {
      quote: "Traditional job searches felt overwhelming, but Airuter's AI streamlined the process! It analyzed my strengths, preferences, and market trends to match me with the right companies. This smart matching system helped me land my ideal job quickly!",
      author: "Preeti",
      position: "Marketing Strategist",
      location: "Jaipur, India",
      feature: "AI-Powered Networking – Finding the Right Fit!"
    },
    {
      quote: "The AI mock interviews were next-level! They didn't just assess my answers—they provided in-depth analysis of my problem-solving approach and communication. This real-time feedback gave me a competitive edge and helped me secure my data scientist role!",
      author: "Shubham",
      position: "Data Scientist",
      location: "Ahmedabad, India",
      feature: "Real-Time AI Feedback – Unlocking True Potential!"
    }
  ];

  // Create a repeated array but with fewer repetitions for faster scrolling
  const REPETITIONS = 20; // Reduced from 100 to make animation faster
  const repeatedTestimonials = Array(REPETITIONS).fill().flatMap(() => testimonials);

  return (
    <div className="testimonials-containers">
      <div className="testimonials-contents">
        <div className="testimonials-headers">
          <h2 className="titles">Success Stories: How Airuter's AI Transformed Careers!</h2>
        </div>

        <div
          className="carousels-wrappers"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`carousels-tracks ${isPaused ? "paused" : ""}`}>
            {repeatedTestimonials.map((testimonial, index) => (
              <div key={index} className="testimonials-cards">
                <div className="feature-tag">🚀 {testimonial.feature}</div>
                <blockquote className="testimonials-quotes">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonials-authors">
                  <div className="authors-infos">
                    <p className="authors-names">{testimonial.author}</p>
                    <p className="authors-position">{testimonial.position}</p>
                    <p className="authors-location">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}