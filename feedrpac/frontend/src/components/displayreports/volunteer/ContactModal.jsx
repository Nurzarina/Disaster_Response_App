import { Modal, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { handleVolunteerAction } from '../../utils/AddOrRemoveVolunteer';
import './ContactModal.css';

const ContactModal = ({ show, handleClose, phone, report_id, user_id }) => {

  // Function to handle volunteer action
  const handleAction = (action) => {
    handleVolunteerAction(report_id, user_id, action);  // Sends user_id, report_id, and 'add' action

    console.log("report_id : ", report_id);   // Debugging : To check if the props are received.
    console.log("user_id : ", user_id);
    console.log("action : ", action);
  };

  return (
    <Modal show={show} onHide={handleClose} size='md' centered>
      <Modal.Header closeButton>
        <Modal.Title>Contact the Reporter</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p id='contactText'>
          Contact the person who submitted this report via WhatsApp or phone:
        </p>
        <ul className='button-list justify-content-center mb-2'>
          <li>
            <a
              href={`https://wa.me/${phone.replace(/[\s\-\(\)\+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleAction('add')}
            >
              <Button variant="success">
                <FaWhatsapp style={{ marginRight: '8px', marginBottom: '2px' }} />
                WhatsApp
              </Button>
            </a>
          </li>
          <li>
            <Button
              variant="primary"
              onClick={() => {
                handleAction('add');
                window.location.href = `tel:${phone}`;
              }}
            >
              <IoMdCall style={{ marginRight: '8px', marginBottom: '2px' }} />
              Call
            </Button>
          </li>
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;
