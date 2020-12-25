import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Table from 'react-bootstrap/Table'

import { getOrders } from '../redux/actions/orders'
import Wrapper from '../components/Wrapper'

const OrdersPage = () => {
  const ordersState = useSelector((state) => state.ordersState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const { orders } = ordersState
  return (
    <div className='orders-wrapper'>
      <Wrapper>
        <div className='orders-wrapper__table-wrapper p-lg-2'>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Booking Date</th>
                <th>ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((order, key) => {
                  const { customer, address, bookingDate } = order
                  return (
                    <tr key={order.id}>
                      <td>{key + 1}</td>
                      <td>{customer?.name || 'N/A'}</td>
                      <td>{`${address?.city}, ${address?.country}`}</td>
                      <td>{moment(new Date(bookingDate)).format('YYYY-MM-DD')}</td>
                      <td>{order.id}</td>
                      <td>
                        <a href='/' className='view' title='View Details' data-toggle='tooltip'>
                          <i className='material-icons'>&#xE5C8;</i>
                        </a>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </Table>
        </div>
      </Wrapper>
    </div>
  )
}

export default OrdersPage
