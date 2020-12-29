import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ClipLoader from 'react-spinners/ClipLoader'

import { getOrder, updateOrder } from '../redux/actions/orders'
import Wrapper from '../components/Wrapper'
import Loader from '../components/Loader'

const Order = ({ match }) => {
  const [validated, setValidated] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [orderDetails, setOrderDetails] = useState({
    id: '',
    title: '',
    bookingDate: '',
    customer: {},
    address: {}
  })
  const ordersState = useSelector((state) => state.ordersState)
  const dispatch = useDispatch()

  useEffect(() => {
    const {
      params: { orderId }
    } = match
    dispatch(getOrder(orderId))
  }, [])

  useEffect(() => {
    if (ordersState.order) setOrderDetails(ordersState.order)
  }, [ordersState.order])

  const onhandleChange = (event) => {
    const {
      target: { name, value }
    } = event
    setDisabled(event.empty)
    setOrderDetails((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
    } else {
      dispatch(updateOrder(orderDetails))
    }
  }

  const { fetching, updating } = ordersState
  const { bookingDate, title, address, customer } = orderDetails

  return (
    <div className='order-wrapper' data-testid='order-wrapper'>
      <Wrapper>
        <div className='p-lg-2'>
          {fetching ? (
            <Loader />
          ) : (
            <Row className='wrapper-row'>
              <Col className='border-default p-3 justify-content-center align-items-center'>
                <Modal.Body>
                  <Row className='modal-body-row justify-content-center align-items-center'>
                    <Col
                      md={12}
                      className='flex-column justify-content-center align-items-center text-center'
                    >
                      <Col>
                        <h2>Order Details</h2>
                      </Col>
                      <Col className='divider mt-1 mb-3 text-darkkhaki d-flex flex-row justify-content-center align-items-center'>
                        <p className='line my-2 mx-1'>&nbsp;</p>
                        <p className='icon'>
                          <img src='/images/entwined.svg' alt='entwined'></img>
                        </p>
                        <p className='line my-2 mx-1'>&nbsp;</p>
                      </Col>
                    </Col>
                    <Col md={12} className='justify-content-center align-items-center'>
                      <Form noValidate validated={validated} data-testid='order-form' onSubmit={handleSubmit}>
                        <Form.Row>
                          <Form.Group as={Col} md='6'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              name='title'
                              value={title}
                              data-testid='title'
                              onChange={onhandleChange}
                            />
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label>Booking Date</Form.Label>
                            <Form.Control
                              required
                              value={moment(new Date(bookingDate)).format('YYYY-MM-DD')}
                              name='bookingDate'
                              type='date'
                              data-testid='bookingDate'
                              onChange={onhandleChange}
                            />
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} md='12'>
                            <h6 className='font-weight-bold text-darkkhaki py-1'>Information</h6>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Name
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='name' value={customer?.name || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Email
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='email' value={customer?.email || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='12' sm={{ span: 10, offset: 2 }}>
                            <Form.Label column className='font-weight-label'>
                              Phone
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='phone' value={customer?.phone || 'N/A'} />
                            </Col>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} md='12'>
                            <h6 className='font-weight-bold text-darkkhaki py-1'>Address</h6>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Street
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='street' value={address?.street || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Zip
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='zip' value={address?.zip || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              City
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='city' value={address?.city || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Country
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly data-testid='country' value={address?.country || 'N/A'} />
                            </Col>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row className='justify-content-center align-items-center'>
                          <Button
                            className='order-button bg-black mt-3'
                            type='submit'
                            data-testid='order-button'
                            disabled={updating || disabled}
                          >
                            {updating ? (
                              <ClipLoader size={30} color={'#fff'} loading={true} />
                            ) : (
                              'Submit Changes'
                            )}
                          </Button>
                        </Form.Row>
                      </Form>
                    </Col>
                  </Row>
                </Modal.Body>
              </Col>
            </Row>
          )}
        </div>
      </Wrapper>
    </div>
  )
}

export default Order
