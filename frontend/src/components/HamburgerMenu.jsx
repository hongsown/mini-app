import { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = ({ currentLang, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    onLanguageChange(lang);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`hamburger-menu ${isOpen ? 'active' : ''}`}>
        <button className="hamburger-button" onClick={toggleMenu} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        <nav className={`menu-items ${isOpen ? 'open' : ''}`}>
          <div className="menu-header">
            <img 
              src="https://storage.123fakturera.se/public/icons/diamond.png" 
              alt="123 Fakturera" 
              className="menu-logo"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h3>123 Fakturera</h3>
            <button className="close-menu" onClick={toggleMenu} aria-label="Close menu">
              ×
            </button>
          </div>
          
          <ul className="menu-nav">
            <li>
              <Link to="/terms" onClick={() => setIsOpen(false)}>
                {currentLang === 'en' ? 'Terms of Service' : 'Användarvillkor'}
              </Link>
            </li>
            <li>
              <Link to="/pricelist" onClick={() => setIsOpen(false)}>
                {currentLang === 'en' ? 'Price List' : 'Prislista'}
              </Link>
            </li>
          </ul>
          
          <div className="language-switcher">
            <h4>{currentLang === 'en' ? 'Language' : 'Språk'}</h4>
            <div className="language-buttons">
              <button 
                className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                <img 
                  src="https://storage.123fakturere.no/public/flags/GB.png" 
                  alt="English"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                English
              </button>
              <button 
                className={`lang-btn ${currentLang === 'sv' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('sv')}
              >
                <img 
                  src="https://storage.123fakturere.no/public/flags/SE.png" 
                  alt="Svenska"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                Svenska
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      {isOpen && <div className="menu-overlay" onClick={toggleMenu}></div>}
    </>
  );
};

export default HamburgerMenu;