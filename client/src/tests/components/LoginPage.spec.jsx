import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import LoginPage from '../../views/LoginPage'

const createMockStore = configureMockStore([thunk])

const mockSignInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValueOnce({ id: '2' })
  .mockRejectedValueOnce();
jest.mock('../../utils/firebaseConfig', () => ({
  auth: () => ({ signInWithEmailAndPassword: mockSignInWithEmailAndPassword })
}));

afterEach(cleanup)

describe('Login Page', () => {
  const props = {
    login: jest.fn(),
    usersState: {
      user: null,
      logingIn: false,
      isLoggedIn: false
    },
    onhandleChange: jest.fn(),
    history: {
      push: jest.fn
    }
  }

  const usersState = {
    user: null,
    logingIn: false,
    isLoggedIn: false
  }

  const setup = () => {
    const store = createMockStore({
      usersState
    })

    return render(
      <Provider store={store}>
        <LoginPage {...props} />
      </Provider>
    )
  }

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders the Login Page', () => {
    const { queryByTestId } = setup()
    expect(queryByTestId('login-page')).toBeTruthy()
  })

  it('should render a form with name, email and password fields', () => {
    const { queryByTestId } = setup()
    const loginForm = queryByTestId('login-form')
    expect(queryByTestId('login-form')).toBeTruthy()
    expect(queryByTestId('email')).toBeTruthy()
    expect(queryByTestId('password')).toBeTruthy()
    expect(queryByTestId('login-button')).toBeTruthy()
});

  test('should trigger onchange when email is changed', () => {
    const { queryByTestId } = setup()
    const emailInput = queryByTestId('email')
    expect(emailInput).toBeInTheDocument()
    fireEvent.change(emailInput, {
      target: { value: 'janedoe@example.com' }
    })
    expect(emailInput).toHaveValue('janedoe@example.com')
  })

  test('should trigger onchange when password is changed', () => {
    const { queryByTestId } = setup()
    const passwordInput = queryByTestId('password')
    expect(passwordInput).toBeInTheDocument()
    fireEvent.change(passwordInput, {
      target: { value: 'janedoe' }
    })
    expect(passwordInput).toHaveValue('janedoe')
  })

  test('should login in user', () => {
    const { queryByTestId } = setup()
    const loginButton = queryByTestId('login-button')
    const emailInput = queryByTestId('email')
    const passwordInput = queryByTestId('password')
    fireEvent.change(emailInput, {
      target: { value: 'janedoe@example.com' }
    })
    fireEvent.change(passwordInput, {
      target: { value: 'janedoe' }
    })
    fireEvent.click(loginButton)
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  })
})
