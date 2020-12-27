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
    // console.log('helooooooo>>>>>')
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
    }
    setValidated(true)
    dispatch(updateOrder(orderDetails))
  }

  const { success, fetching } = ordersState
  const orderMock = {
    uid: '1',
    bookingDate: new Date(),
    title: 'title',
    address: {
      city: 'Barcelona',
      country: 'Spain',
      street: 'Pullades',
      zip: '08027'
    },
    customer: {
      email: 'admin@admin.com',
      name: 'Gabriel',
      phone: '666 777 888'
    }
  }
  // const { bookingDate, title, address, customer } = orderMock
  const { bookingDate, title, address, customer } = orderDetails
  // console.log('adres>>>>', address, 'customer>>>>', customer)

  return (
    <div className='order-wrapper'>
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
                      <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Row>
                          <Form.Group as={Col} md='6'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                              required
                              type='text'
                              name='title'
                              value={title}
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
                              min={moment().format('YYYY-MM-DD')}
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
                              <Form.Control plaintext readOnly value={customer?.name || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Email
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly value={customer?.email || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='12' sm={{ span: 10, offset: 2 }}>
                            <Form.Label column className='font-weight-label'>
                              Phone
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly value={customer?.phone || 'N/A'} />
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
                              <Form.Control plaintext readOnly value={address?.street || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Zip
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly value={address?.zip || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              City
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly value={address?.city || 'N/A'} />
                            </Col>
                          </Form.Group>
                          <Form.Group as={Col} md='6'>
                            <Form.Label column className='font-weight-label'>
                              Country
                            </Form.Label>
                            <Col>
                              <Form.Control plaintext readOnly value={address?.country || 'N/A'} />
                            </Col>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row className='justify-content-center align-items-center'>
                          <Button
                            className='order-buttton bg-darkkhaki mt-3'
                            type='submit'
                            disabled={fetching || disabled}
                          >
                            {fetching ? (
                              <ClipLoader size={30} color={'#00acc1'} loading={true} />
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
