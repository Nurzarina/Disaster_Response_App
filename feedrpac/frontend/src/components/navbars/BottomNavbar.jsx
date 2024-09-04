// // BottomNavbar.jsx
// import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTachometerAlt, faRocket, faHistory, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
// import './BottomNavbar.css';

// const BottomNavbar = () => (
//     <>
//         {/* Sidebar for larger screens */}
//         <Navbar bg="light" expand="lg" className="d-none d-lg-flex flex-column sidebar-navbar">
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav">
//                 <Nav className="flex-column">
//                     <Nav.Link as={Link} to="/">
//                         <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
//                     </Nav.Link>
//                     <Nav.Link as={Link} to="/mission">
//                         <FontAwesomeIcon icon={faRocket} /> Mission
//                     </Nav.Link>
//                     <Nav.Link as={Link} to="/history">
//                         <FontAwesomeIcon icon={faHistory} /> History
//                     </Nav.Link>
//                     <Nav.Link as={Link} to="/profile">
//                         <FontAwesomeIcon icon={faUser} /> User Profile
//                     </Nav.Link>
//                     <Link to="/sosreport" className="sos-link mt-auto">
//                         <Button className="sos-button">
//                             <FontAwesomeIcon icon={faExclamationTriangle} /> SoS
//                         </Button>
//                     </Link>
//                 </Nav>
//             </Navbar.Collapse>
//         </Navbar>

//         {/* Bottom navbar for mobile screens */}
//         <Navbar bg="light" fixed="bottom" className="d-lg-none bottom-navbar">
//             <Nav className="w-100 justify-content-around">
//                 <Nav.Link as={Link} to="/">
//                     <FontAwesomeIcon icon={faTachometerAlt} />
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/mission">
//                     <FontAwesomeIcon icon={faRocket} />
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/history">
//                     <FontAwesomeIcon icon={faHistory} />
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/profile">
//                     <FontAwesomeIcon icon={faUser} />
//                 </Nav.Link>
//                 <Link to="/sosreport" className="sos-link">
//                     <Button className="sos-button">
//                         <FontAwesomeIcon icon={faExclamationTriangle} />
//                     </Button>
//                 </Link>
//             </Nav>
//         </Navbar>
//     </>
// );

// export default BottomNavbar;

// BottomNavbar.jsx
import { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faRocket, faComments, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { SlArrowRightCircle } from "react-icons/sl";
import './BottomNavbar.css';

function BottomNavbar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            {/* <ToggleButton id='launch-button' onClick={handleShow}><SlArrowRightCircle size={30} />
            </ToggleButton> */}
            <SlArrowRightCircle id='launch-button' className="fixed-top-icon" size={40} onClick={handleShow} style={{ cursor: 'pointer' }} 
            />

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Disaster Response App</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Sidebar for larger screens */}
                    {/* <Navbar bg="light" expand="lg" className="d-none d-lg-flex flex-column sidebar-navbar">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav"> */}
                            <Nav className="flex-column">
                                <Nav.Link as={Link} to="/">
                                    <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/guide">
                                    <FontAwesomeIcon icon={faRocket} /> Guide
                                </Nav.Link>
                                <Nav.Link as={Link} to="/history">
                                    <FontAwesomeIcon icon={faComments} /> Community
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    <FontAwesomeIcon icon={faUser} /> User Profile
                                </Nav.Link>
                                <Link to="/sosreport" className="sos-link mt-auto">
                                    <Button className="sos-button">
                                        <FontAwesomeIcon icon={faExclamationTriangle} /> SoS
                                    </Button>
                                </Link>
                            </Nav>
                        {/* </Navbar.Collapse>
                    </Navbar> */}
                </Offcanvas.Body>
            </Offcanvas>



            {/* Bottom navbar for mobile screens */}
            <Navbar bg="light" fixed="bottom" className="d-lg-none bottom-navbar">
                <Nav className="w-100 justify-content-around">
                    <Nav.Link as={Link} to="/">
                        <FontAwesomeIcon icon={faTachometerAlt} />
                    </Nav.Link>
                    <Nav.Link as={Link} to="/guide">
                        <FontAwesomeIcon icon={faRocket} />
                    </Nav.Link>
                    <Link to="/sosreport" className="sos-link">
                        <Button className="sos-button">
                            <FontAwesomeIcon icon={faExclamationTriangle} />
                        </Button>
                    </Link>
                    <Nav.Link as={Link} to="/history">
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

