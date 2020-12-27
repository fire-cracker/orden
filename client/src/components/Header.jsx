import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => (
  <Navbar collapseOnSelect bg="black" expand="lg" variant="dark" id="nav" className="sticky-top">
    <Navbar.Brand href="/">Restauranté</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav defaultActiveKey="home" className="m-auto main-tabs">
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
