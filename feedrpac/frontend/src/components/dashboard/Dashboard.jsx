// import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../login/AuthProvider';
import ReportWidget from './ReportWidget';
import { CSSTransition } from 'react-transition-group';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <Container fluid className="dashboard-container">
            <Row className="justify-content-center my-4">
                <Col className="text-center">
                    <CSSTransition
                        in={!!user}
                        timeout={500}
                        classNames="fade"
                        unmountOnExit
                    >
                        <div>
                            {user ? (
                                <>
                                    <h2 className="welcome-text">Welcome, {user.username}!</h2>
                                    <Button variant="outline-primary" onClick={logout} className="mb-4">
                                        Logout
                                    </Button>
                                </>
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
