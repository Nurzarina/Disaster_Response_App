import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './HoverWindow.css';

const HoverWindow = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div id='hoverwindow'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'block', position: 'relative' }}
    >
      {children} {/* Render the passed button or any child component */}
      {showTooltip && (
        <div className="tooltip-window">
          {content}
        </div>
      )}
    </div>
  );
};

export default HoverWindow;
