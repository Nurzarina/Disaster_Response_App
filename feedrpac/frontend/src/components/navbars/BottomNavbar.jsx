
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faRocket, faComments, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import './BottomNavbar.css';

function BottomNavbar() {

    return (
        <>
            {/* Sidebar */}
            <div className="sidebar">
                <Nav className="d-flex flex-column">
                    <Nav.Link as={Link} to="/" className="nav-item">
                        <FontAwesomeIcon icon={faTachometerAlt} className="nav-icon" />
                        <span className="nav-text">Dashboard</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/missions" className="nav-item">
                        <FontAwesomeIcon icon={faRocket} className="nav-icon" />
                        <span className="nav-text">Mission</span>
                    </Nav.Link>
                    <Link to="/sosreport" className="sos-link nav-item mt-auto" style={{
                        textDecoration: 'none',
                    }}>
                        <FontAwesomeIcon icon={faExclamationTriangle} className="nav-icon" />
                        <span className="nav-text fw-bold">SOS</span>
                    </Link>
                    <Nav.Link as={Link} to="/community/feed" className="nav-item">
                        <FontAwesomeIcon icon={faComments} className="nav-icon" />
                        <span className="nav-text">Community</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile" className="nav-item">
                        <FontAwesomeIcon icon={faUser} className="nav-icon" />
                        <span className="nav-text">User Profile</span>
                    </Nav.Link>

                </Nav>
            </div>
            {/* Bottom navbar for mobile screens */}
            <Navbar fixed="bottom" className="d-lg-none bottom-navbar">
                <Nav className="w-100 justify-content-around">
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/missions">
                        <FontAwesomeIcon icon={faRocket} />
                    </Nav.Link>
                    <Link to="/sosreport" className="sos-link">
                        <Button className="sos-button">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </Button>
                    </Link>
                    <Nav.Link as={Link} to="/community/feed">
                        <FontAwesomeIcon icon={faComments} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        <FontAwesomeIcon icon={faUser} />
                    </Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
}

export default BottomNavbar;

