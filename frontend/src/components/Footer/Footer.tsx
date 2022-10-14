import React from 'react'
import {Container, Row, Col } from "react-bootstrap";

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className="mt-2">
      <Container>
        <Row>
          <Col className="text-center py-3">
            Copyright &copy; Proshop
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer;