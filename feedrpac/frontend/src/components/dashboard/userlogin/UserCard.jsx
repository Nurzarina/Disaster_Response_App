import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../tobackend/AuthProvider';
import defaultProfileImg from '/profileimg.png';
import './UserCard.css'

function UserCard() {

    const { user, logout } = useAuth();

    return (
        <Card className="profile-card">
            <Card.Body>
                        <Card.Img
                            variant="top"
                            src={user.profileImg || defaultProfileImg}
                            alt="Profile"
                            className="profile-img"
                        />
                        <Card.Title className="welcome-text">
                            Welcome back, {user.username}!
                        </Card.Title>
                        <Button
                            variant="outline-primary"
                            onClick={logout}
                            className="mt-2 mb-2"
                        >
                            Logout
                        </Button>
                    </Card.Body>
                </Card>
                )
}

                export default UserCard