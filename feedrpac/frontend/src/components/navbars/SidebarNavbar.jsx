
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SidebarNavbar.css'; // Import custom CSS

const SidebarNavbar = () => (
    <Navbar className="sidebar-navbar" bg="info" variant="light" expand="lg">
        <Nav className="flex-column">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/missions">Mission</Nav.Link>
            <Nav.Link as={Link} to="/posts">Community</Nav.Link>
            <Nav.Link as={Link} to="/profile">User Profile</Nav.Link>
        </Nav>
    </Navbar>
);

export default SidebarNavbar;
