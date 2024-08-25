// MapModal.js
import { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import MapPage from './MapPage';
import './MapModal.css';                      // Import your map component

function MapModal({ show, handleClose, lat, long, report_id, descr }) {

  const [selectedReport, setSelectedReport] = useState({ lat: 0, lng: 0, reportId: '', descr: ''});

  // Clear latitude, longitude and report_id values to get ready for next data.
  const closeAndClear = () => {
    setSelectedReport({
      lat : 0,
      long : 0,
      report_id : '',
      descr: ''
    });
      handleClose();
  };

  return (
    <Modal show={show} onHide={closeAndClear} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Emergency's Location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <div className="map-container">      {/* Map Section */}
              <MapPage 
              latitude={lat}
              longitude={long}
              report_ID={report_id}
              description={descr}
              />                        {/* Map is displayed here */}
            </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="success" onClick={handleClose}>
          Volunteer
        </Button> */}
        <Button variant="secondary" onClick={closeAndClear}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MapModal;
