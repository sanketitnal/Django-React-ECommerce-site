import Spinner from 'react-bootstrap/Spinner';
import { Container } from 'react-bootstrap';
import React from 'react';

function LoadingIndicator() {
    return (
      <Container style={{display: "flex", width: "100%", height: "100%", justifyContent:"center", alignContent: "center"}}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }
  
  export default LoadingIndicator;