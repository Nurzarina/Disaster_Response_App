
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LogInCard.css'; // Import the CSS file

function LogInCard() {
  return (
    <Card className=''>
      <Card.Body>
        <h3>You are currently not signed in</h3>
        <Link to="/login">
          <Button variant='outline-primary'>
            Log In
          </Button>
        </Link>
        <p className='mt-3'>
          Don't have an account?{' '}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </Card.Body>
    </Card>
  );
}

export default LogInCard;
