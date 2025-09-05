import React, { useEffect, useState } from 'react';
import ExternalLink from '../utils/ExternalLink';
import './Home.css';

import Profile from '../assets/profile.jpg';
import { useScrollEnd } from '../utils/UseScrollEnd';

interface HomeProps {
  isRetroMode?: boolean;
}

const Home: React.FC<HomeProps> = ({ isRetroMode = false }) => {
  const atEnd = useScrollEnd();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [displayText, setDisplayText] = useState('NGAWANG TENZIN');
  const [terminalLines, setTerminalLines] = useState([] as string[]);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    let glitchInterval: ReturnType<typeof setInterval> | undefined;
    let terminalInterval: ReturnType<typeof setInterval> | undefined;
    let lineIndex = 0;

    if (isRetroMode) {
      // Glitch effect for name
      glitchInterval = setInterval(() => {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const originalText = 'NGAWANG TENZIN';
        let glitched = originalText;
        const glitchTimes = Math.floor(Math.random() * 2 + 1);
        for (let i = 0; i < glitchTimes; i++) {
          const randomIndex = Math.floor(Math.random() * originalText.length);
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          glitched = glitched.substring(0, randomIndex) + randomChar + glitched.substring(randomIndex + 1);
        }
        setDisplayText(glitched);
        setTimeout(() => {
          setDisplayText(originalText);
        }, 100);
      }, 3000);

      // Terminal typing effect
      const terminalCommands = [
        '> whoami',
        'ngawang_tenzin',
        '> cat skills.txt',
        'React.js | Node.js | Python | TypeScript',
        '> ls projects/',
        'barma-sorig-web-app/ | quiz-mobile-app/ | portfolio-website/',
        '> status',
        'AVAILABLE FOR HIRE',
        '> echo "Let\'s build something amazing!"',
        'Let\'s build something amazing!'
      ];

      terminalInterval = setInterval(() => {
        if (lineIndex < terminalCommands.length && terminalCommands[lineIndex]) {
          setTerminalLines(prev => {
            const newLines = prev.slice();
            newLines.push(terminalCommands[lineIndex]);
            return newLines;
          });
          lineIndex++;
        } else {
          setTimeout(() => {
            setTerminalLines([]);
            lineIndex = 0;
          }, 3000);
        }
      }, 800);
    } else {
      // Professional mode - no special effects
      setDisplayText('NGAWANG TENZIN');
      setTerminalLines([]);
    }

    return () => {
  // Removed scroll indicator cleanup (handled by useScrollEnd)
      clearInterval(timeInterval);
      if (glitchInterval) clearInterval(glitchInterval);
      if (terminalInterval) clearInterval(terminalInterval);
    };
  }, [isRetroMode]);

  const formatTime = (date: Date) => {
    const options = {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    } as const;
    return date.toLocaleTimeString('en-UK', options);
  };

  const formatDate = (date: Date) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    } as const;
    return date.toLocaleDateString('en-UK', options);
  };

  return (
    <div className={isRetroMode ? 'home-container retro-mode' : 'home-container professional-mode'}>
      {/* Background Elements (only in retro mode) */}
      {isRetroMode ? (
        <React.Fragment>
          <div className="grid-background">
            <div className="grid-lines"></div>
            <div className="grid-horizon"></div>
          </div>
          <div className="floating-shapes">
            <div className="shape triangle"></div>
            <div className="shape circle"></div>
            <div className="shape square"></div>
            <div className="shape diamond"></div>
          </div>
          <div className="particles">
            {Array.from({ length: 20 }).map(function(_, i) {
              const left = Math.random() * 100;
              const delay = Math.random() * 5;
              const duration = 3 + Math.random() * 4;
              return (
                <div key={i} className="particle" style={{
                  left: left + '%',
                  animationDelay: delay + 's',
                  animationDuration: duration + 's'
                }}></div>
              );
            })}
          </div>
        </React.Fragment>
      ) : null}

      {/* Header with Digital Clock */}
      <header className="header">
        <div className="clock-section">
          <div className="clock-display">
            <span className="time">{formatTime(currentTime)}</span>
            <span className="date">{formatDate(currentTime)}</span>
          </div>
          <div className="status-section">
            <span className="status-dot"></span>
            <span className="status-text">
              {isRetroMode ? 'SYSTEM ONLINE' : 'Available for Work'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-grid">
          {/* Left Panel - Profile */}
          <div className="profile-panel">
            <div className="profile-frame">
              {isRetroMode ? <div className="scan-lines"></div> : null}
              {isRetroMode ? <div className="retro-specs"> <div className="bridge"></div></div> : null}
              <img 
                src={Profile} 
                alt="Ngawang Tenzin" 
                className="profile-image"
              />
              {isRetroMode ? (
                <div className="image-overlay">
                  <div className="overlay-text">DEVELOPER.EXE</div>
                </div>
              ) : null}
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-label">
                  {isRetroMode ? 'CODING' : 'Development'}
                </span>
                <div className="stat-progress">
                  <div className="stat-fill" style={{width: '75%'}}></div>
                </div>
                <span className="stat-value">75%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  {isRetroMode ? 'DESIGN' : 'UI/UX Design'}
                </span>
                <div className="stat-progress">
                  <div className="stat-fill" style={{width: '80%'}}></div>
                </div>
                <span className="stat-value">80%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">
                  {isRetroMode ? 'COFFEE' : 'Problem Solving'}
                </span>
                <div className="stat-progress">
                  <div className="stat-fill" style={{width: '100%'}}></div>
                </div>
                <span className="stat-value">{isRetroMode ? 'MAX' : '100%'}</span>
              </div>
            </div>
          </div>

          {/* Center Panel - Main Info */}
          <div className="info-panel">
            <div className="title-section">
              <h1 className="main-title">{displayText}</h1>
              <div className="title-underline"></div>
            </div>

            <div className="role-display">
              <span className="role-prefix">{isRetroMode ? 'ROLE:' : 'Position:'}</span>
              <span className="role-text">
                {isRetroMode ? 'FULL-STACK DEVELOPER' : 'Full-Stack Software Engineer'}
              </span>
            </div>

            <div className="description-box">
              <div className="box-header">
                <span className="box-title">
                  {isRetroMode ? 'ABOUT.TXT' : 'Professional Summary'}
                </span>
                {isRetroMode ? (
                  <div className="window-controls">
                    <span className="control minimize"></span>
                    <span className="control maximize"></span>
                    <span className="control close"></span>
                  </div>
                ) : null}
              </div>
              <div className="box-content">
                <p>
                  {isRetroMode ? (
                    "Committed software engineer specializing in modern web technologies. I create digital experiences that blend cutting-edge functionality with intuitive design. From concept to deployment, I build applications that make a difference."
                  ) : (
                    "Highly driven software engineer with expertise in modern web technologies and full-stack development. Proven track record of delivering scalable applications and innovative solutions. Passionate about creating user-centered digital experiences that drive business value."
                  )}
                </p>
              </div>
            </div>

            <div className="tech-grid">
              <div className="tech-category">
                <h3>Frontend</h3>
                <div className="tech-items">
                  <span className="tech-chip"><ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS</ExternalLink>, <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://getbootstrap.com/docs/5.3/getting-started/introduction/'>Bootstrap</ExternalLink>, <ExternalLink href='https://tailwindcss.com/docs/installation/using-vite'>Tailwind CSS</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://react.dev/learn/creating-a-react-app'>React (TypeScript)</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://nextjs.org/docs'>Next.js</ExternalLink></span>
                </div>
              </div>
              <div className="tech-category">
                <h3>Backend</h3>
                <div className="tech-items">
                  <span className="tech-chip"><ExternalLink href='https://nodejs.org/en/learn/getting-started/introduction-to-nodejs'>Node.js</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://docs.python.org/3/'>Python</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://hackernoon.com/learn-c-a-cheat-sheet-for-newcomers'>C#</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://dev.mysql.com/doc/'>MySQL</ExternalLink></span>
                </div>
              </div>
              <div className="tech-category">
                <h3>Tools</h3>
                <div className="tech-items">
                  <span className="tech-chip"><ExternalLink href='https://cloud.google.com/'>Google Cloud</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://aws.amazon.com/'>AWS</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://git-scm.com/doc'>Git</ExternalLink></span>
                  <span className="tech-chip"><ExternalLink href='https://www.figma.com/'>Figma</ExternalLink></span>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <a
                className="btn primary"
                href="resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="btn-text">
                  {isRetroMode ? 'RESUME.EXE' : 'View RESUME'}
                </span>
                {isRetroMode ? <span className="btn-glow"></span> : null}
              </a>
              <a
                className="btn secondary"
                href="mailto:ng.tenzin1998@gmail.com"
              >
                <span className="btn-text">
                  {isRetroMode ? 'HIRE' : 'Get in Touch'}
                </span>
                {isRetroMode ? <span className="btn-glow"></span> : null}
              </a>
            </div>
          </div>

          {/* Right Panel - Terminal/Info */}
          <div className="side-panel">
            {isRetroMode ? (
              // Terminal in retro mode
              <React.Fragment>
                <div className="terminal-header">
                  <span className="terminal-title">TERMINAL.EXE</span>
                  <div className="terminal-controls">
                    <span className="terminal-control"></span>
                    <span className="terminal-control"></span>
                    <span className="terminal-control"></span>
                  </div>
                </div>
                <div className="terminal-body">
                  <div className="terminal-content">
                    {terminalLines.filter(function(line) {
                      return line && typeof line === 'string';
                    }).map(function(line, index) {
                      const lineClass = 'terminal-line ' + (line.startsWith('>') ? 'command' : 'output');
                      return (
                        <div key={index} className={lineClass}>
                          {line}
                        </div>
                      );
                    })}
                    <div className="terminal-cursor">_</div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              // Professional info panel
              <div className="info-card">
                <h3 className="info-title">Quick Facts</h3>
                <div className="info-items">
                  <div className="info-item">
                    <span className="info-label">Experience:</span>
                    <span className="info-value">{'< '}1 Year</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Projects:</span>
                    <span className="info-value">5+ Completed</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Location:</span>
                    <span className="info-value">Available Remote</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className="info-value">Open to Opportunities</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Panel - Social Links */}
        <div className="social-panel">
          <div className="social-container">
            <div className="social-title">
              {isRetroMode ? 'CONNECT.EXE' : 'Connect With Me'}
            </div>
            <div className="social-links">
              <a href="https://github.com/cbms26" className="social-link" target='_blank_'>
                <span className="social-icon">
                  {isRetroMode ? 'GH' : (<img width="40" height="40" src="https://img.icons8.com/nolan/64/github.png" alt="github"/>)}
                </span>
                <span className="social-label">
                  {isRetroMode ? 'GITHUB' : 'GitHub'}
                </span>
              </a>
              <a href="www.linkedin.com/in/ngawang-tenzin-cbms" className="social-link" target='_blank_'>
                <span className="social-icon">
                  {isRetroMode ? 'LI' : (<img width="40" height="40" src="https://img.icons8.com/nolan/64/linkedin.png" alt="linkedin"/>)}
                </span>
                <span className="social-label">
                  {isRetroMode ? 'LINKEDIN' : 'LinkedIn'}
                </span>
              </a>
              <a href="https://www.instagram.com/curious_coder_cbms/" className="social-link" target='_blank_'>
                <span className="social-icon">
                  {isRetroMode ? 'IG' : (<img width="40" height="40" src="https://img.icons8.com/nolan/64/instagram-new.png" alt="instagram-new"/>)}
                </span>
                <span className="social-label">
                  {isRetroMode ? 'INSTAGRAM' : 'Instagram'}
                </span>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575241155392" className="social-link" target='_blank_'>
                <span className="social-icon">
                  {isRetroMode ? 'FB' : (<img width="40" height="40" src="https://img.icons8.com/nolan/64/facebook.png" alt="facebook"/>)}
                </span>
                <span className="social-label">
                  {isRetroMode ? 'FACEBOOK' : 'Facebook'}
                </span>
              </a>
              <a href='https://dev.to/cbms26' className='social-link' target='_blank_'>
                <span className="social-icon">
                  {isRetroMode ? 'DEV' : (<img width="40" height="40" src="https://img.icons8.com/windows/32/dev.png" alt="dev"/>)}
                </span>
                <span className='social-label'>
                  {isRetroMode ? 'DEV' : 'Dev'}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className='projects-section'>

          <div className={isRetroMode ? 'projects-placeholder retro' : 'projects-placeholder professional'}>
            <h2 className="projects-title">
              {isRetroMode ? 'PROJECTS.EXE' : 'Project Section'}
            </h2>
            <div className="projects-coming-soon">
              {isRetroMode ? 'Coming soon...' : 'Projects coming soon!'}
            </div>
          </div>
        </div>
      </main>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className={atEnd ? "scroll-text end" : "scroll-text"}>
          {atEnd
            ? (isRetroMode ? 'REACHED END' : 'You have reached the end')
            : (isRetroMode ? 'SCROLL DOWN' : 'Scroll to explore')}
        </div>
        {!atEnd && (
          <div className="scroll-arrow">
            {isRetroMode ? (
              <React.Fragment>
                <div className="arrow-line"></div>
                <div className="arrow-point"></div>
              </React.Fragment>
            ) : (
              <span>↓</span>
            )}
          </div>
        )}
      </div>
      
      <div className={isRetroMode ? "footer retro" : "footer professional"}>
        {isRetroMode ? (
          <>
            <span className="footer-title">PORTFOLIO-V1.EXE</span>
            <span className="footer-made">MADE WITH <span style={{color: '#ff0080', fontWeight: 'bold'}}>&#10084;</span> BY CBMS</span>
          </>
        ) : (
          <>portfolio-v1 &mdash; Made with ♥ by CBMS</>
        )}
      </div>
    </div>
  );
};

export default Home;

