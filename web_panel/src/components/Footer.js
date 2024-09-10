import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>At [Brand Name], we offer high-quality casual outfits for men. Visit us for the latest trends and styles.</p>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Phone: +123-456-7890</p>
          <p>Email: support@brandname.com</p>
        </div>
        <div className="footer-section location">
          <h3>Our Address</h3>
          <p>123 Fashion Street, New York, NY</p>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6811.571328451163!2d74.1560819929099!3d31.39247299709075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3918ff085b8238e5%3A0xa191d823cedcf4a3!2sSukh%20Chayn%20Gardens!5e0!3m2!1sen!2s!4v1725888464198!5m2!1sen!2s"
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 [Brand Name]. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
