import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';


const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        style={{
         
          zIndex: 100,
          width: "48px",
          height: "48px",
          borderRadius: "24px",
          background: "rgba(255, 255, 255, 0.5)",
          color: "#fff",
          border: "none",
          fontSize: "24px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          cursor: "pointer"
        }}
        aria-label="Scroll to top"
      >
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
    )
  );
};

export default ScrollToTopButton;