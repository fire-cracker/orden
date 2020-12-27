import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'

import Table from 'react-bootstrap/Table'

import { getOrders } from '../redux/actions/orders'
import Wrapper from '../components/Wrapper'
import Loader from '../components/Loader'

const OrdersPage = () => {
  const ordersState = useSelector((state) => state.ordersState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrders())
  }, [])

  const { orders, fetching } = ordersState
  const ordersMock = [
    {
      uid: 'hKlIKPoZc2xCKGTUKZK2',
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
  ]

  return (
    <div className='orders-wrapper'>
      <Wrapper>
        <div className='orders-wrapper__table-wrapper p-lg-2'>
          {fetching ? (
            <Loader />
          ) : (
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
                      <tr key={order.uid}>
                        <td>{key + 1}</td>
                        <td>{customer?.name || 'N/A'}</td>
                        <td>{`${address?.city}, ${address?.country}`}</td>
                        <td>{moment(new Date(bookingDate)).format('YYYY-MM-DD')}</td>
                        <td>{order.uid}</td>
                        <td>
                          <a href={`/orders/${order.uid}`} className='view' title='View Details' data-toggle='tooltip'>
                            <i className='material-icons'>&#xE5C8;</i>
                          </a>
                        </td>
                      </tr>
                    )
                  })}
              </tbody>
            </Table>
          )}
        </div>
      </Wrapper>
    </div>
  )
}

export default OrdersPage
