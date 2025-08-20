import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../services/api';

const Terms = () => {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for click outside detection
  const mobileMenuRef = useRef(null);
  const langDropdownRef = useRef(null);
  const hamburgerRef = useRef(null);
  const langTriggerRef = useRef(null);

  const fetchTermsData = async (lang) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ApiService.fetchTerms(lang);
      setTermsData(response.data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load terms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
    document.title = lang === 'sv' ? '123 Fakturera - Användarvillkor' : '123 Fakturera - Terms of Service';
    fetchTermsData(lang);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Function to convert markdown links to HTML
  const parseMarkdownLinks = (text) => {
    if (!text) return text;
    // Convert [text](url) to <a href="url">text</a>
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLangDropdown = (e) => {
    e.stopPropagation();
    setIsLangDropdownOpen(!isLangDropdownOpen);
  };

  // Update the refs and click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close mobile menu if clicking outside
      if (isMobileMenuOpen && 
          mobileMenuRef.current && 
          hamburgerRef.current &&
          !mobileMenuRef.current.contains(event.target) && 
          !hamburgerRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }

      // Fix language dropdown click outside detection
      if (isLangDropdownOpen) {
        const desktopLangTrigger = document.querySelector('.language-pc-menu-items');
        const desktopLangDropdown = document.querySelector('.lang-drop .dropdownList');
        const mobileLangTrigger = document.querySelector('.lang-dropk .dropdownContainer');
        const mobileLangDropdown = document.querySelector('.lang-dropk .dropdownList');
        
        const isClickInDesktopLang = (desktopLangTrigger && desktopLangTrigger.contains(event.target)) ||
                                     (desktopLangDropdown && desktopLangDropdown.contains(event.target));
        
        const isClickInMobileLang = (mobileLangTrigger && mobileLangTrigger.contains(event.target)) ||
                                    (mobileLangDropdown && mobileLangDropdown.contains(event.target));
        
        if (!isClickInDesktopLang && !isClickInMobileLang) {
          setIsLangDropdownOpen(false);
        }
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen, isLangDropdownOpen]);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsLangDropdownOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Load initial terms data
  useEffect(() => {
    fetchTermsData(currentLang);
  }, []);

  return (
    <div className="terms-container">
      {/* Background Image - Full Page */}
      <div className="background-container">
        <img 
          src="https://storage.123fakturera.se/public/wallpapers/sverige43.jpg" 
          alt="" 
          id="background-image"
          className="background-image"
        />
      </div>

      {/* Navigation */}
      <nav className="navigation-out">
        <header className="navigation-header">
          <section className="navigation-section">
            <div className="logoa">
              <a href="/">
                <img 
                  alt="" 
                  className="navigation-logo" 
                  src="https://storage.123fakturera.se/public/icons/diamond.png"
                />
              </a>
            </div>
            
            <div 
              className="open-menu-dds" 
              ref={hamburgerRef}
              onClick={toggleMobileMenu}
            >
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 24 24" 
                className="navigation-svg" 
                height="1em" 
                width="1em" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"></path>
              </svg>
            </div>

            <div className="navigation-menu-bar">
              {/* Mobile Dropdown Menu */}
              <div 
                className="menu-drop-down" 
                ref={mobileMenuRef}
                style={{ height: isMobileMenuOpen ? '325px' : '0px' }}
              >
                <div className="menu-drop-down-container">
                  <a className="menu-drop-down-item" href="#home" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="collectionSpan">
                      <p className="menu-item-name">Home</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#order" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="collectionSpan">
                      <p className="menu-item-name">Order</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#customers" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="collectionSpan">
                      <p className="menu-item-name">Our Customers</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="collectionSpan">
                      <p className="menu-item-name">About us</p>
                    </span>
                  </a>
                  <a className="menu-drop-down-item" href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="collectionSpan">
                      <p className="menu-item-name">Contact Us</p>
                    </span>
                  </a>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="pc-menu">
                <a className="pc-menu-items" href="#home">
                  <span className="collectionSpan">
                    <p className="collectionitem">Home</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#order">
                  <span className="collectionSpan">
                    <p className="collectionitem">Order</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#customers">
                  <span className="collectionSpan">
                    <p className="collectionitem">Our Customers</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#about">
                  <span className="collectionSpan">
                    <p className="collectionitem">About us</p>
                  </span>
                </a>
                <a className="pc-menu-items" href="#contact">
                  <span className="collectionSpan">
                    <p className="collectionitem">Contact Us</p>
                  </span>
                </a>
                <a 
                  className="pc-menu-items language-pc-menu-items" 
                  href="#" 
                  ref={langTriggerRef}
                  onClick={toggleLangDropdown}
                >
                  <div>
                    <div className="language-title-box">
                      <p className="language-name">
                        {currentLang === 'en' ? 'English' : 'Svenska'}
                      </p>
                      <img 
                        src={currentLang === 'en' 
                          ? "https://storage.123fakturere.no/public/flags/GB.png"
                          : "https://storage.123fakturere.no/public/flags/SE.png"
                        } 
                        className="flag-icon drop-down-image" 
                        alt="" 
                      />
                    </div>
                  </div>
                </a>
              </div>

              {/* Desktop Language Dropdown */}
              <div className="lang-drop">
                <div className="lang-drop-container">
                  <div 
                    className="dropdownList" 
                    ref={langDropdownRef}
                    style={{ display: isLangDropdownOpen ? 'block' : 'none' }}
                  >
                    <div 
                      className="language-Svenska drop-down-element" 
                      onClick={() => handleLanguageChange('sv')}
                    >
                      <div className="drop-down-lang-name">Svenska</div>
                      <div className="drop-down-image-div">
                        <img 
                          src="https://storage.123fakturere.no/public/flags/SE.png" 
                          className="drop-down-image" 
                          alt="Svenska" 
                        />
                      </div>
                    </div>
                    <div 
                      className="language-English drop-down-element" 
                      onClick={() => handleLanguageChange('en')}
                    >
                      <div className="drop-down-lang-name">English</div>
                      <div className="drop-down-image-div">
                        <img 
                          src="https://storage.123fakturere.no/public/flags/GB.png" 
                          className="drop-down-image" 
                          alt="English" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Language Dropdown */}
            <div 
              className="lang-dropk" 
              ref={langTriggerRef}
              onClick={toggleLangDropdown}
            >
              <div>
                <div className="dropdownContainer">
                  <div className="language-box">
                    <p className="flag-name collectionitem">
                      {currentLang === 'en' ? 'English' : 'Svenska'}
                    </p>
                    <img 
                      src={currentLang === 'en' 
                        ? "https://storage.123fakturere.no/public/flags/GB.png"
                        : "https://storage.123fakturere.no/public/flags/SE.png"
                      } 
                      className="icon-flag-nav" 
                      alt={currentLang === 'en' ? 'English' : 'Svenska'} 
                    />
                  </div>
                </div>
                <div 
                  className="dropdownList" 
                  ref={langDropdownRef}
                  style={{ display: isLangDropdownOpen ? 'block' : 'none' }}
                >
                  <div 
                    className="language-Svenska drop-down-element" 
                    onClick={() => handleLanguageChange('sv')}
                  >
                    <div className="drop-down-lang-name">Svenska</div>
                    <div className="drop-down-image-div">
                      <img 
                        src="https://storage.123fakturere.no/public/flags/SE.png" 
                        className="drop-down-image" 
                        alt="Svenska" 
                      />
                    </div>
                  </div>
                  <div 
                    className="language-English drop-down-element" 
                    onClick={() => handleLanguageChange('en')}
                  >
                    <div className="drop-down-lang-name">English</div>
                    <div className="drop-down-image-div">
                      <img 
                        src="https://storage.123fakturere.no/public/flags/GB.png" 
                        className="drop-down-image" 
                        alt="English" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
      </nav>

      {/* Main Content */}
      <div className="content">
        <section className="terms-section">
          <div className="terms-top-text">
            <h1 className="terms-heading">
              {termsData?.terms?.terms || (currentLang === 'sv' ? 'Användarvillkor' : 'Terms')}
            </h1>
            <button className="go-back-button" onClick={handleGoBack}>
              {termsData?.terms?.close || (currentLang === 'sv' ? 'Stäng och gå tillbaka' : 'Close and Go Back')}
            </button>
          </div>

          {loading && (
            <div className="back-terms">
              <div className="loading-state">
                <div className="spinner"></div>
                <p>{currentLang === 'sv' ? 'Laddar användarvillkor...' : 'Loading terms...'}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="back-terms">
              <div className="error-state">
                <h2>{currentLang === 'sv' ? 'Fel vid laddning' : 'Error Loading Terms'}</h2>
                <p>{error}</p>
                <button onClick={() => fetchTermsData(currentLang)} className="retry-button">
                  {currentLang === 'sv' ? 'Försök igen' : 'Try Again'}
                </button>
              </div>
            </div>
          )}

          {!loading && !error && termsData && (
            <div className="back-terms">
              {termsData.terms.terms_text_1 && (
                <p dangerouslySetInnerHTML={{__html: termsData.terms.terms_text_1}}></p>
              )}
              
              {termsData.terms.terms_text_2 && (
                <p>{termsData.terms.terms_text_2}</p>
              )}
              
              {termsData.terms.terms_text_3 && (
                <p style={{whiteSpace: 'pre-line'}}>{termsData.terms.terms_text_3}</p>
              )}
              
              {termsData.terms.terms_text_4 && (
                <p className="mt-6">{termsData.terms.terms_text_4}</p>
              )}
              
              {termsData.terms.terms_text_5 && (
                <p className="mb-6">{termsData.terms.terms_text_5}</p>
              )}
              
              {termsData.terms.terms_text_6 && (
                <p>{termsData.terms.terms_text_6}</p>
              )}
              
              {termsData.terms.terms_text_7 && (
                <p>{termsData.terms.terms_text_7}</p>
              )}
              
              {termsData.terms.terms_text_8 && (
                <p>{termsData.terms.terms_text_8}</p>
              )}
              
              {termsData.terms.terms_text_9 && (
                <p>{termsData.terms.terms_text_9}</p>
              )}
              
              {termsData.terms.terms_text_10 && (
                <p>{termsData.terms.terms_text_10}</p>
              )}
              
              {termsData.terms.terms_text_10_se && (
                <p>{termsData.terms.terms_text_10_se}</p>
              )}
              
              {termsData.terms.terms_text_11 && (
                <p>{termsData.terms.terms_text_11}</p>
              )}
              
              {termsData.terms.terms_text_12 && (
                <p>{termsData.terms.terms_text_12}</p>
              )}
              
              {termsData.terms.terms_text_13 && (
                <p>{termsData.terms.terms_text_13}</p>
              )}
              
              {termsData.terms.terms_text_14 && (
                <p>{termsData.terms.terms_text_14}</p>
              )}
              
              {termsData.terms.terms_text_15 && (
                <p>{termsData.terms.terms_text_15}</p>
              )}
              
              {termsData.terms.terms_text_16 && (
                <p>{termsData.terms.terms_text_16}</p>
              )}
              
              {termsData.terms.terms_text_17 && (
                <p>{termsData.terms.terms_text_17}</p>
              )}
              
              {termsData.terms.terms_text_18 && (
                <p>{termsData.terms.terms_text_18}</p>
              )}
              
              {termsData.terms.terms_text_19 && (
                <p>{termsData.terms.terms_text_19}</p>
              )}
              
              {termsData.terms.terms_text_20 && (
                <p dangerouslySetInnerHTML={{__html: parseMarkdownLinks(termsData.terms.terms_text_20)}}></p>
              )}
              
              {termsData.terms.terms_text_21 && (
                <p>{termsData.terms.terms_text_21}</p>
              )}
              
              {termsData.terms.terms_text_22 && (
                <p>{termsData.terms.terms_text_22}</p>
              )}
              
              {termsData.terms.terms_text_23 && (
                <p>{termsData.terms.terms_text_23}</p>
              )}
              
              {termsData.terms.terms_text_24 && (
                <p>{termsData.terms.terms_text_24}</p>
              )}
            </div>
          )}

          <div className="terms-top-text">
            <button className="go-back-button lower-back-button" onClick={handleGoBack}>
              {termsData?.terms?.close || (currentLang === 'sv' ? 'Stäng och gå tillbaka' : 'Close and Go Back')}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;