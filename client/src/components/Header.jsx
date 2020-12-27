import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

import { logout } from '../redux/actions/users'

const Header = () => (
  <Navbar collapseOnSelect bg='black' expand='lg' variant='dark' id='nav' className='sticky-top'>
    <Navbar.Brand>Ordén</Navbar.Brand>
    <Navbar.Toggle aria-controls='basic-navbar-nav' />
    <Navbar.Collapse id='basic-navbar-nav'>
      <Nav className='m-auto main-tabs'>
        <Breadcrumb>
          <Breadcrumb.Item href='#'>Home</Breadcrumb.Item>
          <Breadcrumb.Item href='https://getbootstrap.com/docs/4.0/components/breadcrumb/'>
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>
      </Nav>
      <Nav className='mr'>
        <Button href='/' variant='outline-darkkhaki' onClick={() => logout()}>
          LOGOUT
        </Button>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
