import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAuth } from '../login/AuthProvider';
import './Profile.css';
import { HiOutlineMail } from "react-icons/hi";

const Profile = () => {
    const { user, logout } = useAuth();
    const handleEmailClick = () => {
        window.location.href = `mailto:${user.email}`;
    };

    const renderUserProfile = () => (
        <Card className="profile-card">
            <div className="cover-img" style={{ backgroundImage: `url(${user.coverImg || 'default-cover.jpg'})` }}></div>
            <Card.Body>
                <Card.Img
                    variant="top"
                    src={user.profileImg || 'default-profile.jpg'}
                    alt={`${user.username}'s profile`}
                    className="profile-img"
                />
                <Card.Title className="welcome-text">
                    @{user.username}
                </Card.Title>
                <Card.Text>{user.bio} <button variant="outline-secondary"
                        className="ms-2"
                        onClick={handleEmailClick}><HiOutlineMail /></button></Card.Text>
                <Card.Text>
                    Website: <a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a>
                </Card.Text>
                <Card.Text>Location: {user.location}</Card.Text>
                <Col className="d-flex justify-content-center">
                    <Card.Text className='ms-3'>Following: {user.following}</Card.Text>
                    <Card.Text className='me-3'>Followers: {user.followers}</Card.Text>
                </Col>
            </Card.Body>
            <Card.Footer>
                <h2>Ongoing Missions</h2>
                <ul>
                    {user.ongoingMission && user.ongoingMission.length > 0 ? (
                        user.ongoingMission.map((mission, index) => (
                            <li key={index}>{mission}</li>
                        ))
                    ) : (
                        <p>No ongoing missions</p>
                    )}
                </ul>
                <h2>Previous Missions</h2>
                <ul>
                    {user.prevMission && user.prevMission.length > 0 ? (
                        user.prevMission.map((mission, index) => (
                            <li key={index}>{mission}</li>
                        ))
                    ) : (
                        <p>No previous missions</p>
                    )}
                </ul>
            </Card.Footer>

            <Button
                variant="outline-primary"
                onClick={logout}
                className="mt-4"
            >
                Logout
            </Button>
        </Card>
    );

    const renderNotLoggedInMessage = () => (
        <h2 className="notlogin-text">You Are Not Logged In</h2>
    );

    return (
        <Container fluid className="user-profile-container">
            <Row className="justify-content-center my-4">
                <Col md={8} lg={6} className="text-center">
                    {user ? renderUserProfile() : renderNotLoggedInMessage()}
                </Col>
            </Row>
        </Container>
    );
};

export default Profile;
