import React, { useState } from 'react'
import Faqs from "../assets/faqlogo.svg"
import Bigplus from "../assets/faqplus.svg"
import Bigminus from "../assets/faqminus.svg"
import '../FAQ/faqq.css'

const Faaq = () => {
  const questions = [
    {
      question: "How to upload assignments in BYND?",
      answer: `Upload via Figma share link (embed) or upload PDFs/JPEGs/PNGs for Illustrator, Photoshop, XD, etc.—both options ensure secure recruiter preview.`
    },
    {
      question: "What happens after the 14-day free trial ends?",
      answer: `After your trial ends, you can choose to upgrade to Pro to continue using advanced insights, unlimited submissions, and engagement tracking. If not, you’ll be moved to the Free Plan with limited features.`
    },
    {
      question: "Will recruiters know I’m tracking the assignment views?",
      answer: `No, recruiters will only see the assignment you shared — tracking happens privately on your BYND dashboard.`
    },
    {
      question: "Do I need to connect my Figma account to use this?",
      answer: `No, you don't have to connect your Figma account, just copy and paste the Figma share link.`
    },
    {
      question: "Do you provide legal help or ownership protection?",
      answer: `No, The BYND does not offer legal support or act as a legal protection service.`
    },
  ]
  const [showanswer, setShowanswer] = useState(null);
  return (
    <div id='faqs' className="faq-section">
      <div className="faq">
        <div className="faq-visual">
          <h2>Frequently asked <span>questions</span></h2>
          <img className='faqimg' src={Faqs} alt='FAQ'  />
        </div>
        <div className="faq-list">
          {questions.map((item, index) => (
            <div className="faq-question-row" key={index}>
             <div
  className={`faq-question${showanswer === index ? " selected" : ""}`}
  onClick={() => setShowanswer(showanswer === index ? null : index)}
>
  <span>{item.question}</span>
  <img
    src={showanswer === index ? Bigminus : Bigplus}
    alt="toggle"
  />
</div>
              {showanswer === index && (
                <div className="faq-answer">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Faaq
