// "use client";

// import { useState } from "react";
// import "./Faq.css";
// export default function Faq() {
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const faqs = [
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//     {
//       question: "Is interview transcription available?",
//       answer: `In adherence to data privacy protection standards, Final Round AI does not retain interview transcriptions. `,
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setExpandedIndex(expandedIndex === index ? null : index);
//   };

//   return (
//     <div className="faq-container">
//       <div>
//         <div className="InterviewProcessHeader">
//           <p>From Day One to Final Rounds</p>
//           <h2>
//             A suite of AI tools to navigate through this difficult recruiting
//             season
//           </h2>
//         </div>

//         <div className="faq-list">
//           {faqs.map((faq, index) => (
//             <div key={index} className="faq-item">
//               <button onClick={() => toggleFAQ(index)} className="faq-question">
//                 <span>{faq.question}</span>
//                 <span className="faq-icon">
//                   {expandedIndex === index ? "−" : "+"}
//                 </span>
//               </button>

//               {expandedIndex === index && (
//                 <div className="faq-answer">
//                   <p>{faq.answer}</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import "./Faq.css";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqData = [
    {
      question: "Is interview transcription available?",
      answer:
        "In adherence to data privacy protection standards, Airuter does not retain interview transcriptions. However, users have the option to access an Interview Report immediately following each session. It is important to note that if the 'View Interview Report' option is not selected upon session completion, retrieval of the report will not be possible at a later time.",
    },
    {
      question: "What is the cancellation and refund policy?",
      answer:
        "Our cancellation and refund policy allows for full refunds within 30 days of purchase if you're not satisfied with our service.",
    },
    {
      question: "What is the policy for the free trial?",
      answer:
        "The free trial gives you full access to all features for 14 days with no credit card required.",
    },
    {
      question: "Which domains/industries are supported by Airuter?",
      answer:
        "Airuter supports a wide range of industries including technology, finance, healthcare, and more.",
    },
    {
      question: "What is the cancellation and refund policy?",
      answer:
        "Our cancellation and refund policy allows for full refunds within 30 days of purchase if you're not satisfied with our service.",
    },
    {
      question: "What is the policy for the free trial?",
      answer:
        "The free trial gives you full access to all features for 14 days with no credit card required.",
    },
    {
      question: "Which domains/industries are supported by Airuter?",
      answer:
        "Airuter supports a wide range of industries including technology, finance, healthcare, and more.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div style={{ margin: "0px auto" }} className="InterviewProcessHeader">
        <h2>
          A suite of AI tools to navigate through this difficult recruiting
          season
        </h2>
      </div>
      <div className="faq-container">
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
              <span className="faq-icon">
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>
            <div className="faq-answer">{item.answer}</div>
          </div>
        ))}
      </div>
    </>
  );
}
