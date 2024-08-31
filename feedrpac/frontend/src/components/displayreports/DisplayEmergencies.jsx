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
import ContactModal from './volunteer/ContactModal';
import { reportLink } from '../backendAddress/URL';
import { useAuth } from '../backendAddress/AuthProvider'; // Import useAuth for user authentication.

const DisplayEmergencies = () => {
  const { disastertype } = useParams();
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [mapModalShow, setMapModalShow] = useState(false);
  const [contactModalShow, setContactModalShow] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const navigate = useNavigate();
  const detailVolunteer = "Click here to volunteer for this report.";

  const { user } = useAuth(); // Access user authentication state

  useEffect(() => {
    document.body.classList.add('displayReportPage-body-style');
    return () => {
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
    filterReports(type, severityFilter);                  // Apply existing severity filter
  }, [disastertype, severityFilter, reports]);

  const filterReports = (type, severity) => {
    let filtered = reports;

    if (type !== 'All') {
      filtered = filtered.filter(report => report.disastertype === type);
    }

    if (severity !== 'All') {
      filtered = filtered.filter(report => report.severity === severity);
    }

    setFilteredReports(filtered);
  };

  const filterChangeByDropdown = (filterType, value) => {
    if (filterType === 'type') {
      navigate(`/emergencies/${value}`);
      setDisasterTypeFilter(value);                 // Update disaster type filter state
      filterReports(value, severityFilter);         // Apply existing severity filter
    } else if (filterType === 'severity') {
      setSeverityFilter(value);                     // Update severity filter state
      filterReports(disastertype, value);           // Apply existing disaster type filter
    }
  };

  const handleShowMap = (report) => {
    setSelectedReport(report);
    setMapModalShow(true);
  };

  const handleShowContact = (report) => {
    if (user) {
      setSelectedReport(report);
      setContactModalShow(true);
    } else {
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
          <Dropdown className="my-1">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Filter by Disaster Type: {disastertype}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(emergencyIcons).map((type, index) => (
                <Dropdown.Item key={index} onClick={() => filterChangeByDropdown('type', type)}>
                  {type}
                </Dropdown.Item>
              ))}
              <DropdownDivider />
              <Dropdown.Item onClick={() => filterChangeByDropdown('type', 'All')}>
                All
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="my-1">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic-severity">
              Filter by Severity: {severityFilter}
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => filterChangeByDropdown('severity', 'Critical')}>
                Critical
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterChangeByDropdown('severity', 'High')}>
                High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterChangeByDropdown('severity', 'Medium')}>
                Medium
              </Dropdown.Item>
              <Dropdown.Item onClick={() => filterChangeByDropdown('severity', 'Low')}>
                Low
              </Dropdown.Item>
              <DropdownDivider />
              <Dropdown.Item onClick={() => filterChangeByDropdown('severity', 'All')}>
                All
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <br></br>
      </Row>

      <Row id="reportCardWrapperRow" className="justify-content-center">
        <TransitionGroup component={null}>
          {filteredReports.map((report, index) => (
            <CSSTransition key={index}
              timeout={500}
              classNames="fade">
              <Col id='reportCardWrapperCol'
                xs={11}
                md={report.length === 1 ? 11 : 6}
                lg={report.length === 1 ? 11 : 5}
                className="mb-2"
              >
                <Card id='reportCard'>
                  <Card.Body id='reportCardBody'>
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
                      <Col xs={4}>
                        <div className="severity-dash-wrapper">
                          <div className={`severity-dash severity-${report.severity}`}></div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <HoverWindow content={detailVolunteer}>
                          <Button id="volunBtn" variant="success" onClick={() => handleShowContact(report)}>
                            <FaHandsHelping color="white" size="40px" />
                          </Button>
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
