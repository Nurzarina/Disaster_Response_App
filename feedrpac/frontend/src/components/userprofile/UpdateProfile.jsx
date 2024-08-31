import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuth } from '../backendAddress/AuthProvider'; // Adjust the path as needed

const UpdateProfile = ({ handleClose }) => {
    const { user, update } = useAuth(); // Access current user
    const [formData, setFormData] = useState({
        _id: user._id,
        fullName: user.fullName || '',
        profileImg: user.profileImg || '',
        coverImg: user.coverImg || '',
        bio: user.bio || '',
        website: user.website || '',
        location: user.location || '',
    });
    const [error, setError] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState(formData.profileImg);
    const [coverImageUrl, setCoverImageUrl] = useState(formData.coverImg);
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
        if (!file) return; // Avoid uploading if no file is selected

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
            console.error('Error uploading image:', error.response ? error.response.data : error.message);
            setError('Failed to upload image.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await update(formData); // Use the update function from AuthContext
            handleClose(); // Close the modal after success
            navigate('/profile'); // Redirect to profile page immediately after update
        } catch (err) {
            console.error('Error updating profile:', err.response ? err.response.data : err.message);
            setError('Failed to update profile.');
        }
    };

    return (
        <Container className="my-5 h-100">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>


                <Form.Group controlId="formProfileImg">
                    <Form.Label>Profile Image</Form.Label>
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
                    <Form.Label>Cover Image</Form.Label>
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
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formWebsite">
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your website URL"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br />
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                <Button variant="secondary" onClick={handleClose} className="ms-2">Cancel</Button>
                
            </Form>
        </Container>
    );
};

export default UpdateProfile;
