import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card, Image } from 'react-bootstrap';
import axios from 'axios';
import axiosInstance from '../tobackend/axiosInstance';
import { useAuth } from '../tobackend/AuthProvider';
import FeedItem from './FeedItem';
import defaultProfileImg from '/profileimg.png';
import './Feed.css';

function Feed() {
  const { user } = useAuth();  // Getting user info from AuthProvider
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [createdPost, setCreatedPost] = useState(null);  // To store and display the created post
  const [posts, setPosts] = useState([]);  // To manage posts list

  const cloudinaryCloudName = 'dyndmpls6';  // Cloudinary cloud name
  const cloudinaryUploadPreset = 'y6dazgfn';  // Cloudinary upload preset

// This useEffect hook is supposed to fetch the posts that current user has posted.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user?.username) {
          const response = await axiosInstance.get(`/user/${user.username}`);
          setPosts(response.data);  // Update posts list with fetched posts
          setError(null);     // Clear error
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to fetch posts.');
      }
    };

    fetchPosts();
  }, [user?.username]);  // Fetch posts when user.username changes

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
      setPosts([response.data, ...posts]);  // Update posts list with new post
      setTitle('');
      setBody('');
      setFile(null);
      setError(null);  // Clear the error message on successful post creation

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
    <Container fluid id="posts-container" className="px-3">
    <Row className="justify-content-center">
      <Col md={8} lg={6} className="my-4">
        <Card id="createPostCard">
          <Card.Body>
            <Card.Title><b>Create a New Post</b></Card.Title>
            <div className="text-center mb-3">
              {user && (
                <>
                  <Image
                    src={user.profileImg || defaultProfileImg}
                    alt="Profile"
                    className="profile-image mb-3"
                    roundedCircle
                    style={{ width: '100px', height: '100px' }}  // Adjust the size here
                  />
                  <p>{user.username}</p>
                </>
              )}
            </div>
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

              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? 'Posting...' : 'Post'}
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      {posts.map(post => (
        <Col key={post._id} md={12} className="mb-4">
          <FeedItem item={post} />
        </Col>
      ))}
    </Row>
  </Container>
  );
}

export default Feed;
