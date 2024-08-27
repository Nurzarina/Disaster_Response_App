// BottomNavbar.jsx
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './BottomNavbar.css'; // Import custom CSS

const BottomNavbar = () => (
    <Navbar className="bottom-navbar" fixed="bottom">
        <Nav className="nav-items">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/mission">Mission</Nav.Link>
            <Nav.Link as={Link} to="/history">History</Nav.Link>
            <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
        </Nav>
        <Link to="/sosreport" className="sos-link">
            <Button className="sos-button">SoS</Button>
        </Link>
    </Navbar>
);

export default BottomNavbar;
