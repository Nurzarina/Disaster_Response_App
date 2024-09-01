import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../login/AuthProvider';
import { reportLink } from '../backendAddress/reportURL';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import ReportWidget from './ReportWidget';
import EventsMap from './EventsMap';
import SOSButton from '../SOSButton';
import './Dashboard.css';
import defaultProfileImg from '/profileimg.png'; // Ensure the path is correct

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [reports, setReports] = useState([]);
    const [showMap, setShowMap] = useState(true);
    const [showIcons, setShowIcons] = useState(true);

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

    const events = reports
        .filter(report => report.location && report.location.coordinates)
        .map(report => ({
            latitude: report.location.coordinates[1],
            longitude: report.location.coordinates[0],
            disastertype: report.disastertype,
            severity: report.severity,
        }));

    return (
        <Container fluid id="dashboard-container">
            <Row className="justify-content-center my-4">
                <Col xs={12} md={8} lg={6} className="text-center">
                    <CSSTransition
                        in={!!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div>
                            {user ? (
                                 // User Profile Card
                                <Card className="profile-card">
                                    <Card.Body>

                                        <Card.Img
                                            variant="top"
                                            src={user.profileImg || defaultProfileImg}
                                            alt="Profile"
                                            className="profile-img"
                                        />

                                        <Card.Title className="welcome-text">
                                            Welcome, {user.username}!
                                        </Card.Title>
                                        <Button
                                            variant="outline-primary"
                                            onClick={logout}
                                            className="mt-4 mb-4"
                                        >
                                            Logout
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <></>  // Render empty JSX to avoid passing `null`
                            )}
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div>
                            {!user ? (
                                 <SOSButton />
                            ) : (
                                <></>  // Render empty JSX to avoid passing `null`                            
                                )}
                        </div>
                    </CSSTransition>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <ReportWidget />
                </Col>
            </Row>

            <Row className="justify-content-center mt-5">
                <Col xs={12}>
                    <CSSTransition
                        in={showMap}
                        timeout={700}
                        classNames="fade"
                        unmountOnExit
                    >
                        <Card id="EventsMapContainer">
                            <Card.Body>
                                <Card.Title id="EventsMapTitle" className="text-center mb-2">
                                    Events within Malaysia
                                </Card.Title>
                                <EventsMap events={events} />
                            </Card.Body>
                        </Card>
                    </CSSTransition>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
