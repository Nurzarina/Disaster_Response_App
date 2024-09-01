import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../../tobackend/AuthProvider';
import './UserCard.css'

function UserCard() {

    const { user, logout } = useAuth();

  return (
    <Card className="profile-card">
    <Card.Body>
        {user.profileImg && (
            <Card.Img
                variant="top"
                src={user.profileImg}
                alt="Profile"
                className="profile-img"
            />
        )}
        <Card.Title className="welcome-text">
            Welcome back, {user.username}!
        </Card.Title>
        <Button
            variant="outline-primary"
            onClick={logout}
            className="mt-4 mb-3"
        >
            Logout
        </Button>
    </Card.Body>
</Card>
  )
}

export default UserCard