import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Dropdown, DropdownDivider } from 'react-bootstrap';
import { FaHandsHelping } from "react-icons/fa";
import { IoIosArrowBack } from 'react-icons/io';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { CalculateTimeDifference } from '../utils/CalculateTimeDifference';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { emergencyIcons } from '../utils/EmergencyIcons';
import './DisplayEmergencies.css';
import { ScrollComponent } from '../utils/ScrollComponent';
import HoverWindow from './HoverWindow';
import MapModal from './MapModal';
import ContactModal from '../volunteer/ContactModal';
import { reportLink } from '../backendAddress/reportURL';
import { useAuth } from '../login/AuthProvider'; // Import useAuth

const DisplayEmergencies = () => {
  const { disastertype } = useParams();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [mapModalShow, setMapModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();
  const detailContent = "View the exact location on a map.";
  const detailVolunteer = "Click here to volunteer for this report.";

  const { user } = useAuth(); // Access user authentication state

  useEffect(() => {
    // Add a custom class to the body
    document.body.classList.add('displayReportPage-body-style');

    return () => {
      // Remove the class when the component unmounts
      document.body.classList.remove('displayReportPage-body-style');
    };
  }, []);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(reportLink);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  useEffect(() => {
    const type = disastertype || 'All';
    filterReports(type);

    let filtered = disastertype === 'All' ? reports : reports.filter(report => report.disastertype === disastertype);
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFilteredReports(filtered);
  }, [disastertype, reports]);

  const filterReports = (type) => {
    const filtered = type === 'All' ? reports : reports.filter(report => report.disastertype === type);
    setFilteredReports(filtered);
  };

  const filterChangeByDropdown = (type) => {
    navigate(`/emergencies/${type}`);
    setFilterType(type);
    filterReports(type);
  };

  const handleShowMap = (report) => {
    setSelectedReport(report);
    setMapModalShow(true); // Show the map modal
  };

  const handleShowContact = (report) => {
    if (user) { // Check if user is authenticated
      setSelectedReport(report);
      setContactModalShow(true); // Show the contact modal
    } else {
      // Handle unauthenticated access (e.g., redirect to login)
      navigate('/login');
    }
  };

  return (
    <Container fluid id="displayEmergenciesContainer">
      <div className='m-2'>
        <Link to="/"> <IoIosArrowBack />Back</Link>
      </div>
      <Row className="my-2">
        <div id='currTextBg'>
          <h1 id='currText'>Current Situation</h1>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter by Disaster Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(emergencyIcons).map((type, index) => (
                <Dropdown.Item key={index} onClick={() => filterChangeByDropdown(type)}>{type}</Dropdown.Item>
              ))}
              <DropdownDivider />
              <Dropdown.Item onClick={() => filterChangeByDropdown('All')}>All</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <br></br>
      </Row>

      {/* This row wraps wround each report Card. */}
      <Row className="justify-content-center">
        <TransitionGroup component={null}>
          {filteredReports.map((report, index) => (
            <CSSTransition key={index}
              timeout={500}
              classNames="fade">
              {/* Col to make the report cards arranged horizontally */}
              <Col xs={11} md={6} lg={4} className="mb-2">
                {/* Render Card component */}
                <Card id='reportCard'>
                  <Card.Body id='reportCardBody'>
                    {/* Severity Dash Wrapper */}
                    <div className="severity-dash-wrapper">
                      <div className={`severity-dash severity-${report.severity}`}></div>
                    </div>
                    <Row>
                      <Col xs={8}>
                        <Card.Title id='reportCardTitle'>
                          {emergencyIcons[report.disastertype] || emergencyIcons.general} {report.disastertype}
                        </Card.Title>
                        <Card.Text id='reportCardText'>
                          reported at
                        </Card.Text>
                        <Card.Text id='addressText'>
                          {report.state ? `${report.city}, ${report.state}` : 'Location not available.'}
                        </Card.Text>
                        <Card.Text>
                          <Button id='MapBtn' variant='info' onClick={() => handleShowMap(report)}>
                            View on Map
                          </Button>
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">
                            Submitted {CalculateTimeDifference(report.createdAt)}.
                          </small>
                        </Card.Text>
                      </Col>
                      <Col xs={4} className='d-flex align-items-center justify-content-center'>
                        <HoverWindow content={detailVolunteer}>
                          <Button id="volunBtn" variant="success" onClick={() => handleShowContact(report)}> <FaHandsHelping color="white" size="40px" /></Button>
                        </HoverWindow>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </Row>

      <TransitionGroup component={null}>
        <CSSTransition timeout={500} classNames="fade">
          <div id='footer' className='footer-container'>
            <p id='footerText'>You have seen all the reports.</p>
          </div>
        </CSSTransition>
      </TransitionGroup>
      {selectedReport && (
        <>
          <MapModal
            show={mapModalShow}
            handleClose={() => setMapModalShow(false)}
            lat={selectedReport.location.coordinates[1]}
            long={selectedReport.location.coordinates[0]}
            report_id={selectedReport._id}
            descr={selectedReport.description}
            disaster={selectedReport.disastertype}
            sever={selectedReport.severity}
          />
          {user && (
            <ContactModal
              show={contactModalShow}
              handleClose={() => setContactModalShow(false)}
              phone={selectedReport.phone}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default DisplayEmergencies;
