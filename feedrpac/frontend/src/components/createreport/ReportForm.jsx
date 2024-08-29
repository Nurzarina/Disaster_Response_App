import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import MapComponent from './MapComponent';
import { reportLink } from '../backendAddress/reportURL';
import { Container, Card, Form, Button } from 'react-bootstrap';
import './ReportForm.css'

const ReportForm = () => {

    const navigate = useNavigate(); // Use the navigate hook
    const [formData, setFormData] = useState({
        name: '',
        disastertype: '',
        description: '',
        lat: '',
        lng: '',
        phone: '',
        severity: '',
    });

    useEffect(() => {
        // Add a custom class to the body
        document.body.classList.add('createReportPage-body-style');

        return () => {
            // Remove the class when the component unmounts
            document.body.classList.remove('createReportPage-body-style');
        };
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleMapChange = (lat, lng) => {
        setFormData({
            ...formData,
            lat: lat,
            lng: lng
        });
    };

    const useCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setFormData((prevData) => ({
                    ...prevData,
                    lat: latitude,
                    lng: longitude,
                }));
            }, (error) => {
                console.error("Error getting location:", error);
                alert("Unable to retrieve your location. Please allow location access.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(reportLink, {
                name: formData.name,
                disastertype: formData.disastertype,
                location: { // Send location as GeoJSON
                    type: 'Point',
                    coordinates: [formData.lng, formData.lat],
                },
                description: formData.description,
                phone: formData.phone,
                severity: formData.severity,
            });

            alert('Your report has been submitted successfully');
            setFormData({ // Reset the form fields
                name: '',
                disastertype: '',
                description: '',
                lat: '',
                lng: '',
                phone: '',
                severity: '',
            });
            navigate('/emergencies/All'); // Navigate to the 'All' report page
        } catch (error) {
            console.error('Error submitting report:', error.response ? error.response.data : error.message);
            alert('Failed to submit report. Please try again');

            console.log('Data sent from Front End: ', formData);
        }
    };

    return (
        <Container fluid id="custom-card" className="mt-4 mx-1 mx-auto">
            <Card>
                <Card.Header id="formTitle" className="bg-dark text-white">
                    <h2 id='formTitleText'>Submit a Report</h2>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDisasterType">
                            <Form.Label className='mt-3'>Disaster Type:</Form.Label>
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

                        <Form.Group controlId="formPhone">
                            <Form.Label className='mt-3'>Phone:</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                pattern='^(\+?6?01)[0-46-9]-*[0-9]{7,8}$'
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Your Phone Number"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formSeverity">
                            <Form.Label className='mt-3'>Severity:</Form.Label>
                            <Form.Control
                                as="select"
                                name="severity"
                                value={formData.severity}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select level of severity</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                                <option value="Critical">Critical</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Location:</Form.Label>
                            <Button
                                variant="warning"
                                id="CurrentLocationBtn"
                                onClick={useCurrentLocation}
                                className='m-2'
                            >
                                Use Current Location
                            </Button>

                            {/* Assuming MapComponent is another component you have */}
                            <MapComponent
                                location={{ lat: formData.lat, lng: formData.lng }}
                                onLocationChange={handleMapChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription" className='mt-3'>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Description for the situation that needs to be addressed"
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="mt-5">
                            Submit Report
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReportForm;
