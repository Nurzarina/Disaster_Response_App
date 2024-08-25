// import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './SOSButton.css'

function SOSButton() {
  return (
    <div>
    <Link to="/sosreport"><Button id='SOSBtn' variant='danger'><b>SOS!</b></Button></Link>
    <Link to="/signup"><Button variant='primary'>Sign Up</Button></Link>
    <Link to="/login"><Button variant='success'>Log In</Button></Link>
    </div>
  )
}

export default SOSButton