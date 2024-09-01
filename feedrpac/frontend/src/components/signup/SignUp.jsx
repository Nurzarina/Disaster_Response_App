import { useState } from 'react';
import axiosInstance from '../tobackend/axiosInstance';
import axios from 'axios';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        password: '',
        email: '',
        profileImg: '',
        coverImg: '',
        bio: '',
        website: '',
        location: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e, type) => {
        const file = e.target.files[0];
        const uploadPreset = 'y6dazgfn';
        const cloudName = 'dyndmpls6';

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imageUrl = response.data.secure_url;

            if (type === 'profile') {
                setProfileImageUrl(imageUrl);
                setFormData((prevData) => ({
                    ...prevData,
                    profileImg: imageUrl,
                }));
            } else if (type === 'cover') {
                setCoverImageUrl(imageUrl);
                setFormData((prevData) => ({
                    ...prevData,
                    coverImg: imageUrl,
                }));
            }
        } catch (error) {
            setError('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/signup', formData);
            setMessage('Sign up successful!');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); // Set the error message from the backend
            } else {
                setError('Failed to sign up. Please try again later.');
            }
        }
    };

    return (
        <Container fluid id="signup-container" className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col md={12}>
                    <Card id="signupCard" className="p-4 shadow-sm">
                        <Card.Body>
                            <h1 id="signupTitle" className="text-center"><b>Sign Up</b></h1>
                            {message && <Alert variant="success">{message}</Alert>}
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label className='mt-2'>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formFullName">
                                    <Form.Label className='mt-2'>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label className='mt-2'>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label className='mt-2'>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formProfileImg">
                                    <Form.Label className='mt-2'>Profile Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'profile')}
                                    />
                                    {profileImageUrl && (
                                        <img src={profileImageUrl} alt="Profile Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                                    )}
                                </Form.Group>
                                <Form.Group controlId="formCoverImg">
                                    <Form.Label className='mt-2'>Cover Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, 'cover')}
                                    />
                                    {coverImageUrl && (
                                        <img src={coverImageUrl} alt="Cover Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }} />
                                    )}
                                </Form.Group>
                                <Form.Group controlId="formBio">
                                    <Form.Label className='mt-2'>Bio</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your bio"
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formWebsite">
                                    <Form.Label className='mt-2'>Website</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your website URL"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLocation">
                                    <Form.Label className='mt-2'>Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <br />
                                <Button variant="primary" type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;
