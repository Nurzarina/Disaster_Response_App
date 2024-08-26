
import { Modal, Button } from 'react-bootstrap';

const ContactModal = ({ show, handleClose, phone, report_id }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Contact the Reporter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Contact this report via WhatsApp or phone:</p>
        <a href={`https://wa.me/${phone.replace(/[\s\-\(\)\+]/g, '')}`} target="_blank" rel="noopener noreferrer">
          <Button variant="success">WhatsApp</Button>
        </a>
        <Button variant="primary" onClick={() => window.location.href = `tel:${phone}`}>
          Call
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
