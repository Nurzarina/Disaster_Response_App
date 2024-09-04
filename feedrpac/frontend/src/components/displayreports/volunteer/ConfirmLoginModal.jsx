import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ConfirmLoginModal = ({ show, handleClose, onConfirm }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
    handleClose();                                          // Close the modal
  };

  return (
    <Modal show={show} onHide={handleClose} size='md' centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre id='loginText'>  You need to be logged in to access this feature.</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmLoginModal;
