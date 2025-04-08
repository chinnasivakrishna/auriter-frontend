import React from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "./Footer.css"; // Import the CSS for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      {/* KitabAI Container */}
      <div className="footer-section aishaala">
        <h2 className="footer_heading">Final Round</h2>
        <p className="about-us">Vision</p>
        <p className="about-us-text">
          Empower Institutions & Teachers with state of the art digital
          classroom Technology.
        </p>
        <ul className="social-icons">
          <li>
            <FaInstagram />
          </li>
          <li>
            <FaFacebookF />
          </li>
          <li>
            <FaTwitter />
          </li>
          <li>
            <FaLinkedin />
          </li>
          <li>
            <FaYoutube />
          </li>
        </ul>
      </div>
      {/* Office Container */}
      <div className="footer-section office">
        <h2>Address</h2>
        <p>Head Office</p>
        <p>804, 5th Cross, 4th Block</p>
        <p> Koramangala, Bengaluru-560095</p>
        <p>contact@BookAIo.com</p>
        <p>Branch Office </p>
        <p>
          293 Saidulajab Western Marg,
          <br /> New Delhi-110030
        </p>
      </div>

      {/* Quick Links Container */}
      <div className="footer-section quick-links">
        <h2>Quick Links</h2>
        <p>Blog</p>
        <p>Careers</p>
        <p>IOS App</p>
        <p>Android App</p>
      </div>

      {/* Legal Stuff Container */}
      <div className="footer-section legal-stuff">
        <h2>Legal Stuff</h2>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Refunds</p>
        <p>Disclaimer</p>
        <p>
          {/* <Link to="/admin" className="links">
          </Link> */}
          Admin
        </p>
      </div>
    </footer>
  );
};

export default Footer;
