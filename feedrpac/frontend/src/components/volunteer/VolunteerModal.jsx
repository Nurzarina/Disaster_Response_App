import { useAuth } from '../login/AuthProvider';
import { Modal, Container, Row, Col, Card, Button } from 'react-bootstrap';

function VolunteerModal() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <Modal show={show} onHide={closeAndClear} size="md" centered>
          <Modal.Header closeButton>
            <Modal.Title>Welcome, volunteerName!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              If this shows, you are logged in.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAndClear}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal>
          <Modal.Header closeButton>
            <Modal.Title>You are not signed in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              You need to sign in to volunteer.
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={closeAndClear}>
              Sign Up
            </Button>
            <Button variant="secondary" onClick={closeAndClear}>
              No, thanks
            </Button>
          </Modal.Footer>
        </Modal>
      )
      }
    </div >
  )
}

export default VolunteerModal