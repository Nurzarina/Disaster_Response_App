import { useState } from 'react';
import { FaFire, FaVolcano, FaSunPlantWilt, FaLocationPin } from "react-icons/fa6";
import { MdFlood } from "react-icons/md";
import { GiFallingRocks, GiBigWave, GiTornado } from "react-icons/gi";
import { RiEarthquakeFill } from "react-icons/ri";
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';

const Guide = () => {
  const [show, setShow] = useState(false);
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (disaster) => {
    setSelectedDisaster(disaster);
    setShow(true);
  };

  const disasters = [
    {
      name: 'Flood',
      icon: <MdFlood />,
      tips: [
        'Have an emergency plan and practice survival skills, such as first aid and water disinfection.',
        'Charge cell phone batteries and flashlights.',
        'Heed evacuation warnings.',
        'Bring in outdoor furniture and move important items to an upper floor.',
        'Turn off utilities at the main switches or valves if instructed.',
        'Avoid building in flood-prone areas and elevate and reinforce your home.',
        'Install "Check Valves" in sewer traps to prevent floodwater from backing up into drains.',
        'Review your family preparedness plan, establish a family communications plan, assemble a disaster supply kit, and have a family evacuation plan in place.',
      ],
    },
    {
      name: 'Fire',
      icon: <FaFire />,
      tips: [
        'Install and maintain smoke alarms on every level of your home.',
        'Create a fire escape plan with two exit routes from each room.',
        'Practice fire drills regularly with all household members.',
        'Prepare fire extinguishers and ensure everyone knows how to use them.',
        'Heed fire warnings and evacuate immediately if advised.',
        'Clear away flammable materials and maintain a defensible space around your home.',
        'Turn off utilities at the main switches if a fire is imminent and instructed.',
        'Review your fire escape plan, family communications plan, and disaster supply kit regularly.',
      ],
    },
    {
      name: 'Tsunami',
      icon: <GiBigWave />,
      tips: [
        'Know your risk and familiarize yourself with tsunami evacuation routes.',
        'Move to higher ground immediately if you feel an earthquake or hear a tsunami warning.',
        'Stay away from beaches and low-lying coastal areas during a tsunami alert.',
        'Prepare a disaster supply kit with essentials like food, water, and first aid supplies.',
        'Heed evacuation warnings and follow all instructions issued by local authorities.',
        'Turn off utilities at the main switches if advised and avoid using water to prevent contamination.',
        'Review your family communication plan, disaster supply kit, and evacuation plan regularly.',
      ],
    },
    {
      name: 'Tornado',
      icon: <GiTornado />,
      tips: [
        'Identify a safe room or storm cellar in your home, preferably in the basement or an interior room on the lowest floor with no windows.',
        'Secure heavy objects to prevent them from toppling during a tornado.',
        'Prepare an emergency kit with essentials like water, food, flashlight, batteries, and first aid supplies.',
        'Heed tornado warnings and seek shelter immediately if one is issued.',
        'Create a family communication plan to stay in contact with family members during and after a tornado.',
        'Turn off utilities at the main switches if instructed by local authorities.',
        'Practice tornado drills regularly with your household.',
        'Review your family communication plan, disaster supply kit, and shelter location regularly.',
      ],
    },
    {
      name: 'Earthquake',
      icon: <RiEarthquakeFill />,
      tips: [
        'Secure heavy furniture, appliances, and shelves to walls to prevent them from falling during an earthquake.',
        'Practice "Drop, Cover, and Hold On" drills with your family regularly.',
        'Prepare an emergency kit with essentials like food, water, and first aid supplies.',
        'Identify safe spots in each room, such as under sturdy furniture or against an interior wall.',
        'Turn off gas, water, and electricity at the main switches if advised by authorities.',
        'Stay away from windows, mirrors, and other objects that could shatter during an earthquake.',
        'Heed aftershock warnings and stay in a safe location until authorities say it’s safe to leave.',
        'Review your family communication plan, emergency kit, and earthquake drills regularly.',
      ],
    },
    {
      name: 'Volcano Eruption',
      icon: <FaVolcano />,
      tips: [
        'Know your risk and familiarize yourself with local volcanoes and their history of eruptions.',
        'Plan and practice evacuation routes that avoid river valleys and low-lying areas.',
        'Prepare an emergency kit with long sleeves, goggles, masks, food, water, and first aid supplies.',
        'Heed evacuation warnings and evacuate promptly if advised by local authorities.',
        'Wear protective clothing and a mask to avoid inhaling ash.',
        'Turn off utilities at the main switches if instructed.',
        'Stay indoors and close windows, doors, and all ventilation if unable to evacuate.',
        'Review your evacuation plan, disaster supply kit, and family communication plan regularly.',
      ],
    },
    {
      name: 'Landslide',
      icon: <GiFallingRocks />,
      tips: [
        'Be aware of warning signs like cracks in the ground, leaning trees, or changes in water flow.',
        'Avoid high-risk areas during heavy rainfall, such as slopes and valleys.',
        'Plan and practice an evacuation route that takes you away from slopes and potential landslide paths.',
        'Prepare an emergency kit with essentials like food, water, and first aid supplies.',
        'Heed evacuation warnings and follow local authorities’ instructions immediately.',
        'Turn off utilities at the main switches if advised by authorities.',
        'Avoid driving during a landslide; move to higher ground or remain inside and wait for rescue.',
        'Review your family communication plan, disaster supply kit, and evacuation routes regularly.',
      ],
    },
    {
      name: 'Drought',
      icon: <FaSunPlantWilt />,
      tips: [
        'Conserve water by implementing water-saving measures such as fixing leaks, using water-efficient fixtures, and reducing usage.',
        'Plan for water restrictions by storing an emergency supply of water.',
        'Protect plants and animals from dehydration by providing adequate water and shade.',
        'Monitor drought conditions and stay informed about local water supply levels.',
        'Regularly assess and adjust your water usage to conserve as much as possible.',
        'Prepare an emergency kit with water purification tablets, bottled water, and other essentials.',
        'Clear away flammable materials and maintain a defensible space around your home to reduce fire risks during droughts.',
        'Review your family communication plan, disaster supply kit, and water conservation strategies regularly.',
      ],
    },
  ];

  return (
    <Container style={{ padding: '20px' }}>
      <h2 className="text-white">Disaster Preparedness Guide</h2>
      <Row>
        {disasters.map((disaster, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card onClick={() => handleShow(disaster)}>
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <span style={{ fontSize: '1.5rem', marginRight: '10px' }}>{disaster.icon}</span>
                  {disaster.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDisaster?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {selectedDisaster?.tips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Guide;
