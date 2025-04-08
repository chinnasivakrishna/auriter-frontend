"use client";

import { useState } from "react";
import "./InnovationTestimonial.css";

export default function InnovationTestimonial() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote:
        "Even on video interviews – with humans or robots – applicants can still call on AI programs to assist.",
      author: "Alaina Demopoulos",
      company: "The Guardian",
    },
    {
      quote: "Most Innovative AI Recruitment Solutions Provider 2024",
      author: "USA Business Excellence Rewards",
      company: "Business Excellence",
    },
    {
      quote:
        "Revolutionize your hiring process with cutting-edge technology like Final Round AI!",
      author: "Mohini S.",
      company: "LinkedIn",
    },
  ];

  return (
    <div className="testimonials-containers">
      <div className="testimonials-contents">
        <div className="testimonials-headers">
          <p className="subtitles">We're Humble to Mention</p>
          <h2 className="titles">
            Groundbreaking innovation for interviewees, as featured on
          </h2>
        </div>

        <div
          className="carousels-wrappers"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`carousels-tracks ${isPaused ? "paused" : ""}`}>
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="testimonials-cards">
                <blockquote className="testimonials-quotes">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonials-authors">
                  <div className="authors-infos">
                    <p className="authors-names">{testimonial.author}</p>
                    <p className="authors-companys">{testimonial.company}</p>
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
