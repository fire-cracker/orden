import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const Wrapper = ({ children }) => (
  <Jumbotron fluid className="p-0">
    <Container fluid>
      <Row className="top-banner"></Row>
      <Row className="main-wrapper px-0">
        <Container className="container-body d-flex flex-column justify-content-center align-items-center">
          <Card className="mt-n5">
            <Card.Body className="">{children}</Card.Body>
          </Card>
        </Container>
      </Row>
    </Container>
  </Jumbotron>
)

export default Wrapper
