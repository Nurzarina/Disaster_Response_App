import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAuth } from '../tobackend/AuthProvider';
import { reportLink } from '../tobackend/URL';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import ReportWidget from './currentsituation/ReportWidget';
import EventsMap from './overallsituation/EventsMap';
import LogInCard from './userlogin/LogInCard';
import UserCard from './userlogin/userCard';
import './Dashboard.css';
import defaultProfileImg from '/profileimg.png'; // Ensure the path is correct

const Dashboard = () => {
    const { user } = useAuth();
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
                <Col xs={12} md={12} lg={12} className="text-center">
                    <CSSTransition
                        in={!!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div id="userArea">
                            {user ? (
                                 // User Profile Card
                                 <UserCard />
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
                        <div id="guestArea">
                            {!user ? (
                                 // 'Login' & 'SignUp' Call-to-action button
                                 <LogInCard />
                            ) : (
                                <></>  // Render empty JSX to avoid passing `null`                            
                                )}
                        </div>
                    </CSSTransition>
                </Col>
            </Row>

            <Row id="ReportWidgetContainer" className="justify-content-center mt-3">
                <Col xs={12} md={10} lg={8}>
                    <ReportWidget />
                </Col>
            </Row>

            <Row className="justify-content-center mt-2">
                <Col xs={12} md={12} lg={12}>
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
