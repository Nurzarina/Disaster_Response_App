import { useState } from 'react';
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
            <Container fluid className="d-flex align-items-center justify-content-center vh-100">
                <Card className="text-center p-4 shadow-lg">
                    <Card.Body>
                        <Card.Title>Please Log In</Card.Title>
                        <Card.Text>To view your profile.</Card.Text>
                        <Link to="/login">
                            <Button variant="primary">Login</Button>
                        </Link>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="d-flex flex-column align-items-center vh-100" id="profilePage">
            {/* Title and Paragraph Section */}
            <div className="text-center mb-4">
                <h1 className="display-4 profile-title"><b>User Profile</b></h1>
                <p className="lead profile-paragraph">
                    Manage your user profile here.
                </p>
            </div>

            {/* Profile Card Section */}
            <Card className="outside-card w-100">
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
                        <Button variant="primary" onClick={handleShow}>Update Profile</Button>
                        <Button variant="danger" onClick={logout}>Logout</Button>
                    </div>
                </Card.Body>
            </Card>

            {/* Modal for UpdateProfile */}
            <Modal show={show} onHide={handleClose} centered size="lg" scrollable className="update-profile-modal">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title className="modal-title-custom">Update Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <UpdateProfile handleClose={handleClose} />
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Profile;
