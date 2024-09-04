import { Container, Row, Col, Card } from 'react-bootstrap';
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

const Dashboard = () => {
    const { user } = useAuth();
    const [reports, setReports] = useState([]);
    const [showMap, setShowMap] = useState(true);

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
        <Container fluid className="main-content">
            <Row >
                <Col lg={4} md={12} className="mb-3">
                    <CSSTransition
                        in={!!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div id="userArea">
                            {user ? <UserCard /> : <></>}
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div id="guestArea">
                            {!user ? <LogInCard /> : <></>}
                        </div>
                    </CSSTransition>
                </Col>

                <Col lg={4} md={12} className="mb-3">
                    <ReportWidget />
                </Col>

                <Col lg={4} md={12} className="mb-3">
                    <CSSTransition
                        in={showMap}
                        timeout={700}
                        classNames="fade"
                        unmountOnExit
                    >
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-0 fw-bold">Situation in Malaysia</h2>
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
