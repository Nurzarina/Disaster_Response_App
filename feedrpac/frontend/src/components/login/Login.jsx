import { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../backendAddress/AuthProvider';
import { CSSTransition } from 'react-transition-group';
import './Login.css'; // Add custom CSS if needed

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuth();
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        setShowAlert(!!error);
    };

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col md={12}>
                    <Card id="loginCard" className="p-4 shadow-sm">
                        <Card.Body>
                            <h1 className="text-center mb-5"><b>Login</b></h1>
                            <CSSTransition
                                in={showAlert && !!error}
                                timeout={300}
                                classNames="login-transition"
                                unmountOnExit
                            >
                                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                    {error}
                                </Alert>
                            </CSSTransition>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-5">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
