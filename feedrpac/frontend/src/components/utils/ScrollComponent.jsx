import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

//Show 'up' and 'down' arrows only when user has not reached the bottom and the top of the page.
export const ScrollComponent = ({ children }) => {
    const [showArrow, setShowArrow] = useState(false);
    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  
    useEffect(() => {
    
      setShowArrow(false);

      const handleResize = () => {
        setInnerHeight(window.innerHeight);
    };

      const handleScroll = () => {
        const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
        const scrolledToTop = window.scrollY === 0;
  
        if (scrolledToTop) {
          setShowArrow(false);
        } else if (scrolledToBottom){
          setShowArrow(false);
        } else {setShowArrow(true);}
      };

      const checkScrollability = () => {
        if (document.body.scrollHeight > window.innerHeight && window.scrollY === 0) {
          setShowArrow(true);
        } else {
          setShowArrow(false);
        }
      };
  
      checkScrollability();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
        setShowArrow(false);
      };
    }, [innerHeight]);
  
    return (
      <div>
        {children}
        {showArrow && (
          <div className='scroll-arrow'>
            <Row>
              <Col className='text-center fixed-top mt-2' id='arrowUp'>
                <FaArrowUp color='gray' size="20" />
              </Col>
            </Row>
            <Row>
              <Col className='text-center fixed-bottom mb-2' id='arrowDown'>
                <FaArrowDown color='gray' size="20" />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  };