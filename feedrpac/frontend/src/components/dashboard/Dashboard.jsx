import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../login/AuthProvider';
import { reportLink } from '../backendAddress/reportURL';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import ReportWidget from './ReportWidget';
import EventsMap from './EventsMap';
import './Dashboard.css';


const Dashboard = () => {
    const { user, logout } = useAuth();
    const [reports, setReports] = useState([]);

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

    // Process reports into the format needed by EventsMap
    const events = reports
        .filter(report => report.location && report.location.coordinates )  // Ensure coordinates exist
        .map(report => ({
            latitude: report.location.coordinates[1],           // Latitude is the second item in the coordinates array
            longitude: report.location.coordinates[0],          // Longitude is the first item
            disastertype: report.disastertype,
            severity: report.severity,
        }));

    return (
        <Container fluid className="dashboard-container">
            <Row className="justify-content-center my-4">
                <Col md={8} lg={6} className="text-center">
                    <CSSTransition
                        in={!!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div>
                            {user ? (
                                // User Greeting Card
                                <Card className="profile-card">
                                    <Card.Body>
                                        {user.profileImg && (
                                            <Card.Img
                                                variant="top"
                                                src={user.profileImg}
                                                alt="Profile"
                                                className="profile-img"
                                            />
                                        )}
                                        <Card.Title className="welcome-text">
                                            Welcome, {user.username}!
                                        </Card.Title>

                                        {/* Logout Button */}
                                        <Button
                                            variant="outline-primary"
                                            onClick={logout}
                                            className="mt-4"
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
                                <h2 className="notlogin-text">You Are Not Logged In</h2>
                            ) : (
                                <></>  // Render empty JSX to avoid passing `null`
                            )}
                        </div>
                    </CSSTransition>
                </Col>
            </Row>

            {/*  Report Widget component*/}
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <ReportWidget />
                </Col>
            </Row>

            {/* EventsMap Component */}
            <Row className="justify-content-center map-container">
                <Col >
                    <Card.Body>
                        <Card.Title>Events within Malaysia</Card.Title>
                        <EventsMap events={events} />
                    </Card.Body>
                </Col>
            </Row>
        </Container >
    );
};

export default Dashboard;
