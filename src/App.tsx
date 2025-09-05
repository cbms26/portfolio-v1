import { useState, useEffect } from 'react';
import Home from '../src/pages/Home';
import './App.css';

function App() {
  // State for theme mode
  const [isRetroMode, setIsRetroMode] = useState(false);
  // State for animation
  const [isToggleAnimating, setIsToggleAnimating] = useState(false);

  // Load theme from localStorage when the app loads
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'retro') {
      setIsRetroMode(true);
    } else {
      setIsRetroMode(false);
    }
  }, []);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    if (isRetroMode) {
      localStorage.setItem('portfolioTheme', 'retro');
    } else {
      localStorage.setItem('portfolioTheme', 'professional');
    }
  }, [isRetroMode]);

  // Function to toggle theme
  function toggleTheme() {
    setIsToggleAnimating(true);
    setTimeout(function() {
      if (isRetroMode) {
        setIsRetroMode(false);
      } else {
        setIsRetroMode(true);
      }
      setIsToggleAnimating(false);
    }, 150);
  }

  // Build class names
  let appClass = 'app-container ';
  if (isRetroMode) {
    appClass += 'retro-theme ';
  } else {
    appClass += 'professional-theme ';
  }
  if (isToggleAnimating) {
    appClass += 'transitioning';
  }

  let toggleClass = 'theme-toggle ';
  if (isRetroMode) {
    toggleClass += 'retro-active';
  } else {
    toggleClass += 'professional-active';
  }

  let fabClass = 'fab-button ';
  if (isRetroMode) {
    fabClass += 'retro';
  } else {
    fabClass += 'professional';
  }

  return (
    <div className={appClass}>
      {/* Theme Toggle Button */}
      <div className="theme-toggle-container">
        <button
          className={toggleClass}
          onClick={toggleTheme}
          aria-label={isRetroMode ? 'Switch to professional mode' : 'Switch to retro mode'}
        >
          <div className="toggle-track">
            <div className="toggle-thumb">
              <span className="toggle-icon">
                {isRetroMode ? <img width="30" height="30" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-game-console-technology-ecommerce-flaticons-lineal-color-flat-icons-2.png" alt="external-game-console-technology-ecommerce-flaticons-lineal-color-flat-icons-2"/> : <img width="30" height="30" src="https://img.icons8.com/plasticine/50/business--v2.png" alt="business--v2"/>}
              </span>
            </div>
          </div>
          <div className="toggle-labels">
            <span className={'toggle-label professional' + (!isRetroMode ? ' active' : '')}>
              Professional
            </span>
            <span className={'toggle-label retro' + (isRetroMode ? ' active' : '')}>
              Retro Vibe
            </span>
          </div>
        </button>
      </div>

      {/* Theme Status Indicator */}
      <div className="theme-status">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span className="status-text">
            {isRetroMode ? 'RETRO MODE ACTIVE' : 'Professional Mode'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="app-main">
        <section id="home-section" className="section">
          <Home isRetroMode={isRetroMode} />
        </section>
      </main>

      {/* Theme Transition Overlay */}
      {isToggleAnimating ? (
        <div className="transition-overlay">
          <div className="transition-content">
            <div className="transition-spinner"></div>
            <span className="transition-text">
              {'Switching to ' + (isRetroMode ? 'Professional' : 'Retro') + ' Mode...'}
            </span>
          </div>
        </div>
      ) : null}

      {/* Floating Action Button for Mobile */}
      <div className="mobile-toggle-fab">
        <button
          className={fabClass}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isRetroMode ? <img width="35" height="35" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-game-console-technology-ecommerce-flaticons-lineal-color-flat-icons-2.png" alt="external-game-console-technology-ecommerce-flaticons-lineal-color-flat-icons-2"/> : <img width="30" height="30" src="https://img.icons8.com/plasticine/50/business--v2.png" alt="business--v2"/>}
        </button>
      </div>
    </div>
  );
}

export default App;