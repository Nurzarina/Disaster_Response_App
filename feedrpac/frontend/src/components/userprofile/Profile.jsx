import { useState } from 'react';
import { useAuth } from '../login/AuthProvider'; // Adjust the path as needed
import UpdateProfile from './UpdateProfile'; // Import the UpdateProfile component
import { Modal, Button, Card, Container, Row, Col, Image } from 'react-bootstrap'; // Import modal components from react-bootstrap
import { Link } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import './Profile.css';

const Profile = () => {
    const { user, error, logout } = useAuth();
    const [show, setShow] = useState(false); // State to manage modal visibility

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    if (!user) {
        return <Card className='justify-content-center'><p>Please log in to view your profile.</p>
            <Link to={'/login'}><button>Login</button></Link>
        </Card>;


    }

    return (
        <div>
            {error && <p>{error}</p>}
            <Container className='profile-container'>
                <div className='cover-image-container'>
                    <Image src={user.coverImg} alt="Cover" className='cover-image' fluid />
                </div>
                <Row className='profile-details'>
                    <Col xs={12} className="text-center">
                        <div>
                            <Image src={user.profileImg} alt="Profile" className="profile-image" roundedCircle />
                        </div>
                        <h2 className='username'>@{user.username}</h2>
                        <h4 className='full-name'>{user.fullName} {user.location}</h4>
                        <Row>
                            <Col>
                                <p className='bio'>{user.bio}</p>
                                <p className='website'>
                                    Website:<a href={user.website} target='_blank' rel='noopener noreferrer'>{user.website}</a>
                                </p>
                            </Col>
                        </Row>
                        <Button
                            variant="outline-primary"
                            className="email-button"
                            onClick={() => window.location.href = `mailto:${user.email}`}>
                            <HiOutlineMail />
                        </Button>
                    </Col>
                </Row>
                <Row>
                <div className="follow-stats">
                        <span>{user.followers} Followers</span> | <span>{user.following} Following</span>
                    </div>
                </Row>

                <Button variant="primary" onClick={handleShow}>Update Profile</Button> {/* Button to open the modal */}
                <Button variant="danger" onClick={logout}>Logout</Button>
            </Container>

            {/* Modal for UpdateProfile */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateProfile />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Profile;
