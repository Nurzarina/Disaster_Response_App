// import { useState, useEffect } from 'react';
// import axiosInstance from '../tobackend/axiosInstance';
// import { useAuth } from '../tobackend/AuthProvider';
// import './CreatePost.css';
// import UserCard from '../dashboard/userlogin/userCard';

// function CreatePost() {
//     const { user } = useAuth();                         // Obtaining user info from useAuth
//     const [title, setTitle] = useState('');
//     const [body, setBody] = useState('');
//     const [file, setFile] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [profileImage, setProfileImage] = useState('');

// // Commented out due to unable to send formData to BackEnd using fetch method.
//     // useEffect(() => {
//     //     fetch('http://localhost:5050/api/auth/me', {
//     //         credentials: 'include',  // Include cookies in the request
//     //     })                  // Adjust based on your backend route
//     //         .then(response => response.json())
//     //         .then(data => setProfileImage(data.profileImage))
//     //         .catch(err => console.log(err));
//     // }, []);

//     // useEffect(() => {
//     //     axiosInstance.get('auth/me') // Adjust based on your backend route
//     //         .then(response => setProfileImage(response.data.profileImg))
//     //         .catch(err => console.log(err));
//     // }, []);

//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         const formData = new FormData();
//         formData.append('user', user._id);  // Add userId to formData, this user._id is obtained from response in cookie.
//         formData.append('title', title);
//         formData.append('body', body);
//         if (file) {
//             formData.append('img', file);
//         }
//         // Log FormData entries
//         for (let [key, value] of formData.entries()) {
//             console.log(`${key}:`, value);
//         }

// // Commented out due to unable to send formData to BackEnd using fetch method.
//         try {

//             // Log FormData entries
//             for (let [key, value] of formData.entries()) {
//                 console.log(`${key}:`, value);
//             }
//             const response = await fetch('http://localhost:5050/api/posts/create', {
//                 method: 'POST',
//                 body: formData,
//                 credentials: 'include' // Include cookies in the request
//             });
//             const result = await response.json();
//             setLoading(false);
//             if (response.ok) {
//                 console.log(result);
//             } else {
//                 setError(result.error || 'Something went wrong');
//             }
//         } catch (err) {
//             setLoading(false);
//             setError(err.message);
//         }
//     };

// //     try {
// //         const response = await axiosInstance.post('posts/create', formData, {
// //             headers: {
// //                 'Content-Type': 'multipart/form-data' // Set this header for FormData
// //             }
// //         });
// //         setLoading(false);
// //         console.log(response.data);
// //     } catch (err) {
// //         setLoading(false);
// //         setError(err.response?.data?.error || 'Something went wrong');
// //     }
// // };

//     return (
//         <div className="post-form-container my-3">
//             <div>
//                 <UserCard />
//             </div>
//             <br></br>
//             <div className="post-form-header">
//                 {profileImage && (
//                     <img src={profileImage} alt="Profile" className="profile-image" />
//                 )}
//                 <h2>Create a New Post</h2>
//             </div>
//             <form onSubmit={handleSubmit} className="post-form">
//                 <div>
//                     <label htmlFor="title">Title</label>
//                     <input
//                         type="text"
//                         id="title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                         required
//                         placeholder="Your post's title.."
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="body">Body</label>
//                     <textarea
//                         id="body"
//                         value={body}
//                         onChange={(e) => setBody(e.target.value)}
//                         required
//                         placeholder="Write your post here..."
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="file">Choose a file</label>
//                     <input
//                         type="file"
//                         id="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                     />
//                 </div>
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Posting...' : 'Post'}
//                 </button>
//                 {error && <p>{error}</p>}
//             </form>
//         </div>
//     );
// }

// }
// export default CreatePost;

//////////////////////////////////////////////////////////////

import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../tobackend/axiosInstance';
import { useAuth } from '../tobackend/AuthProvider';

function CreatePost() {
    const { user } = useAuth();                                // Getting user info from AuthProvider
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [createdPost, setCreatedPost] = useState(null);      // To store and display the created post

    const cloudinaryCloudName = 'dyndmpls6';             // Cloudinary cloud name
    const cloudinaryUploadPreset = 'y6dazgfn';           // Cloudinary upload preset

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', cloudinaryUploadPreset);
        formData.append('cloud_name', cloudinaryCloudName);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
                formData
            );
            return response.data.secure_url;
        } catch (error) {
            throw new Error('Failed to upload image to Cloudinary');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = '';

            if (file) {
                imageUrl = await uploadImageToCloudinary(file);
            }

            const postData = {
                user: user._id,  // Include user ID
                title,
                body,
                img: imageUrl,  // Send the Cloudinary image URL to the backend
            };

            const response = await axiosInstance.post('posts/create', postData);
            setLoading(false);
            setCreatedPost(response.data);  // Store the created post to display on the page
      
            setError(null);         // Clear the error message on successful post creation

        } catch (err) {
            setLoading(false);

            // Debugging : Log the entire error object to the console for detailed inspection
            console.error('Error occurred:', err);

            // Debugging : log specific properties for quick access
            console.error('Error message:', err.message);
            console.error('Error response:', err.response);

            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <Container>
            <Row>

            </Row>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <Card className="my-4">
                        <Card.Body>
                            <Card.Title>Create a New Post</Card.Title>
                            {user.profileImg && (
                                <div className="text-center mb-3">
                                    <img src={user.profileImg} alt="Profile" className="rounded-circle" width="100" />
                                    <p>{user.username}</p>
                                </div>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="title" className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter the title"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="body" className="mb-3">
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        value={body}
                                        onChange={(e) => setBody(e.target.value)}
                                        placeholder="Enter the content of your post"
                                        rows={5}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group controlId="file" className="mb-3">
                                    <Form.Label>Image (optional)</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'Posting...' : 'Post'}
                                </Button>
                            </Form>
                            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                        </Card.Body>
                    </Card>
                    {createdPost && (
                        <Card className="mt-4">
                            <Card.Body>
                                <Card.Title>{createdPost.title}</Card.Title>
                                <Card.Text>{createdPost.body}</Card.Text>
                                {createdPost.img && <img src={createdPost.img} alt="Post" className="img-fluid" />}
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default CreatePost;
