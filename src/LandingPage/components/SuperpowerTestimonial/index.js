"use client";

import { useState } from "react";
import "./SuperpowerTestimonial.css";

export default function SuperpowerTestimonial() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "How to use AI Material Generator",
      date: "Feb 01,2024",
      author: "Alaina Demopoulos",
      company: "The Guardian",
      description:
        "Using Auriter, I felt much more confident in my interview approach, which led to my offer in project management. ",
    },
    {
      quote: "How to use AI Material Generator",
      date: "Feb 01,2024",
      author: "Alaina Demopoulos",
      company: "The Guardian",
      description:
        "Using Auriter, I felt much more confident in my interview approach, which led to my offer in project management. ",
    },
    {
      quote: "How to use AI Material Generator",
      date: "Feb 01,2024",
      author: "Alaina Demopoulos",
      company: "The Guardian",
      description:
        "Using Auriter, I felt much more confident in my interview approach, which led to my offer in project management. ",
    },
    {
      quote: "How to use AI Material Generator",
      date: "Feb 01,2024",
      author: "Alaina Demopoulos",
      company: "The Guardian",
      description:
        "Using Auriter, I felt much more confident in my interview approach, which led to my offer in project management. ",
    },
    {
      quote: "How to use AI Material Generator",
      date: "Feb 01,2024",
      author: "Alaina Demopoulos",
      company: "The Guardian",
      description:
        "Using Auriter, I felt much more confident in my interview approach, which led to my offer in project management. ",
    },
  ];

  return (
    <div className="SuperpowerTestimonial-containers">
      <div className="SuperpowerTestimonial-contents">
        <div className="SuperpowerTestimonial-headers">
          <p className="subtitles">We're Humble to Mention</p>
          <h2 className="SuperpowerTestimonial-titles">
            Groundbreaking innovation for interviewees, as featured on
          </h2>
        </div>

        <div
          className="SuperpowerTestimonial-wrappers"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`SuperpowerTestimonial-tracks ${
              isPaused ? "paused" : ""
            }`}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="SuperpowerTestimonial-cards">
                <img
                  className="superpower-image"
                  src="https://uploads-ssl.webflow.com/664ed8170ea9a09ebb0c8a24/66600a2aa990e4c75da6fe07_tutor-3.webp"
                />
                <p className="SuperpowerTestimonial-dates">{testimonial.date}</p>
                <blockquote className="SuperpowerTestimonial-quotes">
                  {testimonial.quote}
                </blockquote>
                <div className="SuperpowerTestimonial-authors">
                  <div className="SuperpowerTestimonial-authors-infos">
                    <p className="SuperpowerTestimonial-authors-names">
                      {testimonial.description}
                    </p>
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
