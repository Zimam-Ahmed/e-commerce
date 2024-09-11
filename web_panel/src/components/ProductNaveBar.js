import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const productTypes = ['Hoodies', 'SweatShirts', 'PrintedTies', 'POD', 'Formal'];

const ProductNaveBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="product-navbar">
      {/* Desktop Menu */}
      <nav className="desktop-menu">
        {productTypes.map((product, index) => (
          <Link
            key={index}
            to={`/products/${product}`}
            className="menu-link"
          >
            {product}
          </Link>
        ))}
      </nav>

      {/* Mobile Hamburger Menu */}
      <div className="mobile-menu">
        <button onClick={toggleMenu} className="hamburger">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Mobile Slide-In Menu */}
        <div className={`mobile-nav ${isOpen ? 'open' : ''}`}>
          <button onClick={toggleMenu} className="close-btn">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <ul>
            {productTypes.map((product, index) => (
              <li key={index}>
                <Link
                  to={`/products/${product}`}
                  onClick={toggleMenu} // Close the menu on link click
                  className="mobile-menu-link"
                >
                  {product}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductNaveBar;
