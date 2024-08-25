import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// This file is to emulate widget's buttons
function Buttons() {

  const navigate = useNavigate();   

  const onButtonClick = (filterFromBtn) => {
    navigate(`/allemergencies/${filterFromBtn}`);
  };

  return (
    <div>
      {/* <Link to="/allemergencies"><Button variant='primary'>All Emergencies</Button></Link>
      <Button onClick={() => onButtonClick('Fire')} variant='secondary'>Fire</Button>
      <Button onClick={() => onButtonClick('Flood')} variant='tertiary'>Flood</Button>
      <Button onClick={() => onButtonClick('Landslide')} variant='info'>Landslide</Button>
      <Button onClick={() => onButtonClick('Drought')} variant='dark'>Drought</Button>
      <Button onClick={() => onButtonClick('Tsunami')} variant='warning'>Tsunami</Button>
      <Button onClick={() => onButtonClick('Volcano Eruption')} variant='success'>Volcano Eruption</Button>
      <Button onClick={() => onButtonClick('Tornado')} variant='danger'>Tornado</Button>
      <Button onClick={() => onButtonClick('Earthquake')} variant='light'>Earthquake</Button> */}
      <Link to="/signup"><Button variant='primary'>SIgn Up</Button></Link>

    </div>
  )
}

export default Buttons