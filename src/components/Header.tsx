import React, { useEffect, useState, } from "react";
// import "../pages/Home.css"

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        // Update time every second
        const timeInterval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return clearInterval(timeInterval);
    })

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
		<header className="header">
			<div className="clock-section">
          <div className="clock-display">
            <span className="time">{formatTime(currentTime)}</span>
            <span className="date">{formatDate(currentTime)}</span>
          </div>
          <div className="status-section">
            <span className="status-dot"></span>
            <span className="status-text">
              {'SYSTEM ONLINE'}
            </span>
          </div>
        </div>
		</header>
	);
};

export default Header;