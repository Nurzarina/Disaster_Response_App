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
      <Modal.Title style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontWeight: '700', fontSize: '20px', color: '#212529' }}>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <pre
  id='loginText'
  style={{ 
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
    fontSize: '16px', 
    color: '#2d2d2d', 
    marginLeft: '20px', // Add some space to the left
    marginTop: '10px'
  }}
>You need to be logged in to access this feature.</pre>
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
