// import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SOSButton.css'; // Import the CSS file

function SOSButton() {
  return (
    <div className="container">
      <h3 className="heading">You are currently not signed in</h3>
      <div className="button-container">
        <Link to="/login">
          <Button className="SOSBtn">
            Log In
          </Button>
        </Link>
      </div>
      <p className="paragraph">
        Don't have an account?{' '}
        <Link to="/signup" className="link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default SOSButton