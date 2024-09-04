import { useState } from 'react';
import { useAuth } from '../tobackend/AuthProvider';
import { useAuth } from '../tobackend/AuthProvider';
import UpdateProfile from './UpdateProfile'; // Import the UpdateProfile component
import { Modal, Button, Card, Container, Row, Col, Image } from 'react-bootstrap'; // Import components from react-bootstrap
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import './Profile.css';
import defaultProfileImg from '/profileimg.png';
import defaultCoverImg from '/coverimg.png';

const Profile = () => {
    const { user, error, logout } = useAuth();
    const [show, setShow] = useState(false); // State to manage modal visibility

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // If user is not logged in, give user the option to log in.
    if (!user) {
        return (
            <Card className="text-center p-4 shadow-lg justify-content-center" style={{ width: '400px', height: '300px' }}>
                <Card.Body>
                    <Card.Title>Please Log In</Card.Title>
                    <Card.Text>To view your profile.</Card.Text>
                    <Link to="/login">
                        <Button variant="outline-primary">Login</Button>
                    </Link>
                    <Card.Text className='mt-3'>Does'nt have an account?</Card.Text>
                    <Link to="/signup">
                        <Button variant="outline-primary">Signup</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className='main-content'>
            <Card className="outside-card">
                {error && <p className="text-danger text-center">{error}</p>}
                <div className="cover-image-container">
                    <Image src={user.coverImg || defaultCoverImg} alt="Cover" className="cover-image" fluid />
                </div>
                <Card.Body className="text-center">
                    <div className="profile-image-container">
                        <Image src={user.profileImg || defaultProfileImg} alt="Profile" className="profile-image mb-3" roundedCircle />
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <h2 className="username">@{user.username}</h2>
                        <Button
                            variant="outline-primary"
                            className="email-button ms-3"
                            onClick={() => window.location.href = `mailto:${user.email}`}>
                            <HiOutlineMail /> Email
                        </Button>
                    </div>
                    <h4 className="full-name">{user.fullName} || {user.location}</h4>
                    <p className="bio">{user.bio}</p>
                    <Row className="mb-3">
                        <Col>
                            <p className="website">
                                <a href={user.website} target='_blank' rel='noopener noreferrer'>{user.website}</a>
                            </p>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <p><strong>{user.prevMission?.length || 0} Mission{(user.prevMission?.length === 1 && user.prevMission.length > 0) ? '' : 's'}</strong></p>
                        </Col>
                        <Col>
                            <p><strong>{user.followers?.length || 0} Follower{(user.followers?.length === 1 && user.followers.length > 0) ? '' : 's'}</strong></p>
                        </Col>
                        <Col>
                            <p><strong>{user.following?.length || 0} Following{(user.following?.length === 1 && user.following.length > 0) ? '' : 's'}</strong></p>
                        </Col>
                    </Row>

                    <div className="d-flex justify-content-between">
                        <Button variant="outline-primary" onClick={handleShow}>Update Profile</Button>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Modal for UpdateProfile */}
            <Modal show={show} onHide={handleClose} centered size="md" scrollable>
                <Modal.Body>
                    <UpdateProfile handleClose={handleClose} />
                </Modal.Body>
            </Modal>
            </div>
    );
};

export default Profile;
