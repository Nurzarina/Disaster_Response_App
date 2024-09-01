// import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LogInCard.css'; // Import the CSS file

function LogInCard() {

  return (
    <div id="loginContainer" className="container">
      <h3 className="heading">You are currently not signed in</h3>
      <div className="button-container">
        <Link to="/login">
          <Button id="LoginBtn">
            Log In
          </Button>
        </Link>
      </div>
      <p className="paragraph">
        Don't have an account?{' '}
        <Link id="signupLink" to="/signup" className="Link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LogInCard;