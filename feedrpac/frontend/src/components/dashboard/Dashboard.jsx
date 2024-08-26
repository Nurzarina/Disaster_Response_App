import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAuth } from '../login/AuthProvider';
import ReportWidget from './ReportWidget';
import { CSSTransition } from 'react-transition-group';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();

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
                                // User Profile Card
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
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <ReportWidget />
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
