import React, { useState } from 'react'
import { toast } from 'react-toastify'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ClipLoader from 'react-spinners/ClipLoader'

import { auth } from '../utils/firebaseConfig'

const LoginPage = () => {
  const [validated, setValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })

  const onhandleChange = ({ target: { name, value } }) => {
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const { email, password } = userDetails
    if (form && form.checkValidity() === false) {
      event.stopPropagation()
      return
    }
    setLoading(true)
    setValidated(true)
    await auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => toast.error('wrong credentials, please try again'))
    setLoading(false)
  }

  return (
    <div className='login-wrapper'>
      <Modal
        show={true}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        className='modal-wrapper'
        centered
      >
        <Row className='wrapper-row'>
          <Col className='wrapper-row-col p-3 justify-content-center align-items-center'>
            <Modal.Body>
              <Row className='modal-body-row justify-content-center align-items-center text-center'>
                <Col md={12} className='flex-column justify-content-center align-items-center'>
                  <Col>
                    <h2>Login</h2>
                  </Col>
                  <Col className='divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center'>
                    <p className='line my-2 mx-1'>&nbsp;</p>
                    <p className='icon'>
                      <img
                        src='/images/entwined.svg'
                        alt='entwined'
                        className='fa fa-cutlery'
                      ></img>
                    </p>
                    <p className='line my-2 mx-1'>&nbsp;</p>
                  </Col>
                </Col>
                <Col md={12} className='justify-content-center align-items-center'>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row className='flex-column justify-content-center align-items-center'>
                      <Form.Group as={Col} controlId='validationCustom01'>
                        <Form.Label></Form.Label>
                        <Form.Control
                          required
                          type='text'
                          placeholder='email'
                          name='email'
                          onChange={onhandleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId='validationCustom02'>
                        <Form.Label></Form.Label>
                        <Form.Control
                          required
                          type='password'
                          placeholder='password'
                          name='password'
                          onChange={onhandleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className='justify-content-center align-items-center'>
                      <Button className='bg-black border-0 rounded-0' type='submit'>
                        {loading ? (
                          <ClipLoader size={30} color={'#00acc1'} loading={true} />
                        ) : (
                          'Login'
                        )}
                      </Button>
                    </Form.Row>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
          </Col>
        </Row>
      </Modal>
    </div>
  )
}

export default LoginPage
