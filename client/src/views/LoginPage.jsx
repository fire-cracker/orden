import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ClipLoader from 'react-spinners/ClipLoader'

import { login } from '../redux/actions/users'

const LoginPage = ({ history }) => {
  const [validated, setValidated] = useState(false)
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  })
  const usersState = useSelector(state => state.usersState)
  const dispatch = useDispatch()

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
      setValidated(true)
    }else{
      const user = await dispatch(login(email, password))
      if(user.id) {history.push("/orders")}
    }
  }

  const { logingIn } = usersState
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
          <Col className='border-default p-3 justify-content-center align-items-center'>
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
                      </Form.Group>
                    </Form.Row>
                    <Form.Row className='justify-content-center align-items-center'>
                      <Button className='bg-black border-0 rounded-0' type='submit' disabled={logingIn}>
                        {logingIn ? (
                          <ClipLoader size={30} color={'#fff'} loading={true} />
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
