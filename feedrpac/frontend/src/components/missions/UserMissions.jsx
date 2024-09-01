import { StopVolunteeringButton } from "../utils/AddOrRemoveVolunteer";
import { useAuth } from '../tobackend/AuthProvider';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserMissions() {
  const { user } = useAuth();
  const reportId = "66d4282c19293419608bfa7e"; // Test report id

  if (!user) {
    return (
      <Container fluid className="d-flex align-items-center justify-content-center vh-100">
        <Card className="text-center p-4 shadow-lg">
          <Card.Body>
            <Card.Title>Please Log In</Card.Title>
            <Card.Text>To view your missions.</Card.Text>
            <Link to="/login">
              <Button variant="primary">Login</Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  } else {
    const userId = user._id;   // userId obtained from logged_in user's information using useAuth.

    return (
      <div>
        userMissions
        <StopVolunteeringButton reportId={reportId} userId={userId} />
      </div>
    );
  }
}

export default UserMissions;
