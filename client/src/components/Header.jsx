import React from 'react'

import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

import { logout } from '../redux/actions/users'

const Header = () =>(
  <Navbar collapseOnSelect bg='black' expand='lg' variant='dark' id='nav' className='sticky-top'>
    <Navbar.Brand href='/orders'>Ordén</Navbar.Brand>
    <Navbar.Collapse id='basic-navbar-nav'></Navbar.Collapse>
    <Nav className='mr'>
      <Button href='/' variant='outline-darkkhaki' onClick={() => logout()}>
        LOGOUT
      </Button>
    </Nav>
  </Navbar>
)

export default Header
