import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moment from 'moment'

import Order from '../../views/Order'
import * as actions from '../../redux/actions/orders'
import { order, ordersState } from '../_mocks_/orders.mock'

const createMockStore = configureMockStore([thunk])
const mockGetOrder = jest.fn().mockResolvedValueOnce({
  exists: true,
  id: '2',
  data: jest.fn(() => Promise.resolve())
})

jest.mock('../../utils/firebaseConfig', () => ({
  auth: () => ({ signInWithEmailAndPassword: mockSignInWithEmailAndPassword }),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      get: mockGetOrders,
      doc: jest.fn(() => ({
        get: mockGetOrder
      }))
    }))
  }))
}))

afterEach(cleanup)

describe('Order Page', () => {
  const props = {
    updateOrder: jest.fn(),
    orderDetails: order,
    onhandleChange: jest.fn(),
    handleSubmit: jest.fn(),
    match: { params: { orderId: order.id } }
  }
  const date = moment().format('YYYY-MM-DD')
  const setup = () => {
    const store = createMockStore({
      ordersState
    })

    return render(
      <Provider store={store}>
        <Order {...props} />
      </Provider>
    )
  }

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({ message: 'success' })
    })
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('renders the Order Page', () => {
    const { queryByTestId } = setup()
    expect(queryByTestId('order-wrapper')).toBeTruthy()
  })

  it('should render a form with title and bookingDate inputs', () => {
    const { queryByTestId } = setup()
    expect(queryByTestId('order-form')).toBeTruthy()
    expect(queryByTestId('title')).toBeTruthy()
    expect(queryByTestId('bookingDate')).toBeTruthy()
    expect(queryByTestId('order-button')).toBeTruthy()
  })

  it('should render a form with order details', () => {
    const { queryByTestId } = setup()
    const {
      address: { city, country, zip, street },
      customer: { name, email, phone }
    } = order
    const nameInput = queryByTestId('name')
    const emailInput = queryByTestId('email')
    const phoneInput = queryByTestId('phone')
    const streetInput = queryByTestId('street')
    const zipInput = queryByTestId('zip')
    const cityInput = queryByTestId('city')
    const countryInput = queryByTestId('country')
    expect(nameInput).toBeTruthy()
    expect(emailInput).toBeTruthy()
    expect(phoneInput).toBeTruthy()
    expect(streetInput).toBeTruthy()
    expect(zipInput).toBeTruthy()
    expect(cityInput).toBeTruthy()
    expect(countryInput).toBeTruthy()
    expect(nameInput).toHaveValue(name)
    expect(emailInput).toHaveValue(email)
    expect(phoneInput).toHaveValue(phone)
    expect(streetInput).toHaveValue(street)
    expect(zipInput).toHaveValue(zip)
    expect(cityInput).toHaveValue(city)
    expect(countryInput).toHaveValue(country)
  })

  test('should update title in state is triggered', () => {
    const { queryByTestId } = setup()
    const titleInput = queryByTestId('title')
    expect(titleInput).toBeInTheDocument()
    fireEvent.change(titleInput, {
      target: { value: 'Test Order' }
    })
    expect(titleInput).toHaveValue('Test Order')
  })

  test('should update bookingDate in state when onchange is triggered', () => {
    const { queryByTestId } = setup()
    const bookingDateInput = queryByTestId('bookingDate')
    expect(bookingDateInput).toBeInTheDocument()
    fireEvent.change(bookingDateInput, {
      target: { value: date }
    })
    expect(bookingDateInput).toHaveValue(date)
  })

  test('should submit order changes', () => {
    const updateOrder = jest.spyOn(actions, 'updateOrder')
    const { queryByTestId } = setup()
    const orderButton = queryByTestId('order-button')
    const titleInput = queryByTestId('title')
    fireEvent.change(titleInput, {
      target: { value: 'Test Order' }
    })
    const bookingDateInput = queryByTestId('bookingDate')
    fireEvent.change(bookingDateInput, {
      target: { value: date }
    })
    fireEvent.click(orderButton)
    expect(updateOrder).toHaveBeenCalled()
  })
})
