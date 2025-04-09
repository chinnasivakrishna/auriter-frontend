"use client";

import { useState } from "react";
import "./SuperpowerTestimonial.css";
import RetailHospitality from "../images/img1-retail.jpeg";
import ITTechnology from "../images/image-IT.jpeg";
import Healthcare from "../images/image-Healthcare.jpeg";
import FinancialServices from "../images/image-finance.jpeg";
import Education from "../images/image-education.jpeg";
import LogisticsTransportation from "../images/image-logistic.jpeg";
import Manufacturing from "../images/image-manufacturing .jpeg";

export default function SuperpowerTestimonial() {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      quote: "Retail & Hospitality", 
      description:
        "Airuter quickly screens for customer service skills and positive attitudes in high-volume hiring. Identify candidates who excel in customer-facing roles, improving satisfaction and retention.",
      image: RetailHospitality,
    },
    {
      quote: "IT &Technology", 
      description:
        "Efficiently assess technical communication and foundational knowledge with Airuter. Filter candidates based on essential tech skills, saving valuable time for your technical hiring teams.",
      image: ITTechnology,
    },
    {
      quote: "Healthcare", 
      description:
        "Airuter helps identify candidates with strong empathy and clear communication crucial for patient care. Ensure your team delivers compassionate and effective healthcare services.",
      image: Healthcare,
    },
    {
      quote: "Financial Services", 
      description:
        "Screen candidates for their understanding of compliance and attention to detail using Airuter. Hire individuals prepared for the regulatory demands of the financial sector.",
      image: FinancialServices,
    },
    {
      quote: "Education", 
      description:
        "Discover educators with clear communication skills and a genuine passion for teaching through Airuter's analysis. Build a team that inspires and effectively engages students. ",
      image: Education,
    },
    {
      quote: "Logistics & Transportation", 
      description:
        "Airuter assesses problem-solving abilities and safety awareness in potential hires. Build a reliable team focused on efficient and safe logistical operations.",
      image: LogisticsTransportation,
    },
    {
      quote: "Manufacturing", 
      description:
        "Identify candidates with a keen eye for detail and the ability to follow processes with Airuter. Ensure a workforce committed to quality and efficient production. ",
      image: Manufacturing,
    },
  ];

  // Create a large array of repeated testimonials
  const REPETITIONS = 100;
  const repeatedTestimonials = Array(REPETITIONS).fill().flatMap(() => testimonials);

  return (
    <div className="SuperpowerTestimonial-containers">
      <div className="SuperpowerTestimonial-contents">
        <div className="SuperpowerTestimonial-headers">
          <h2 className="SuperpowerTestimonial-titles">
          Revolutionizing Hiring: AI Video Interviews Transform Talent Screening Across Industries
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
            {repeatedTestimonials.map((testimonial, index) => (
              <div key={index} className="SuperpowerTestimonial-cards">
                <img
                  alt="superpower-image"
                  className="superpower-image"
                  src={testimonial.image}
                />
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
