import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { IoIosArrowBack } from 'react-icons/io';
import L from 'leaflet';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'leaflet/dist/leaflet.css';
import './ReportForm.css';

// Custom hook to handle map events and update position
function MapEvents({ position, setPosition }) {
    useMapEvents({
        click(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
        },
    });

    return position ? (
        <Marker position={position} icon={new L.Icon.Default()}>
            <Popup>
                Selected Location: {position[0].toFixed(5)}, {position[1].toFixed(5)}
            </Popup>
        </Marker>
    ) : null;
}

const ReportForm = ({ history }) => {
    const [formData, setFormData] = useState({
        name: '',
        disastertype: '',
        location: '',
        description: '',
        lat: '',
        lng: '',
        phone: '',
        severity: '',
    });
    const [position, setPosition] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [inTransition, setInTransition] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        // Get user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
                setFormData((prevData) => ({
                    ...prevData,
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }));
            },
            (error) => {
                setError('Unable to retrieve location.');
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!position) {
            setError('Please select a location on the map.');
            return;
        }
        try {
            const data = { ...formData, lat: position[0], lng: position[1], status: 'ongoing' };
            await axios.post('http://localhost:5050/reports', data);
            setMessage('Report created successfully!');
            setTimeout(() => {
                navigate('/emergencies/All'); // Navigate to Report Board after form is submitted.
            }, 1000);
        } catch (err) {
            setError('Failed to create report.');
        }
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <CSSTransition
                        in={inTransition}
                        timeout={300}
                        classNames="fade"
                        onEntered={() => setInTransition(false)}
                    >
                        <div>
                            <h2>Create Disaster Report</h2>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name..."
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDisasterType">
                                    <Form.Label>Disaster Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="disastertype"
                                        value={formData.disastertype}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select type of disaster</option> {/* Placeholder option */}
                                        <option value="Flood">Flood</option>
                                        <option value="Fire">Fire</option>
                                        <option value="Tsunami">Tsunami</option>
                                        <option value="Tornado">Tornado</option>
                                        <option value="Earthquake">Earthquake</option>
                                        <option value="Volcano Eruption">Volcano Eruption</option>
                                        <option value="Landslide">Landslide</option>
                                        <option value="Drought">Drought</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter the location..."
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Enter a description of the disaster..."
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your phone number..."
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSeverity">
                                    <Form.Label>Severity</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select level of severity</option>
                                        <option value="low">Low</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </Form.Control>
                                </Form.Group>
                                <br></br>
                                <Button variant="primary" type="submit" style={{ height: 'fit-content', width: 'fit-content' }}>
                                    Submit
                                </Button>
                                <br></br>
                            </Form>
                        </div>
                    </CSSTransition>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3>Select Location</h3>
                    <MapContainer center={position || [4.2105, 101.9758]} zoom={6} style={{ height: '400px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapEvents position={position} setPosition={setPosition} />
                    </MapContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default ReportForm;
