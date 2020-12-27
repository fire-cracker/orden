import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import LoginPage from './views/LoginPage'
import OrdersPage from './views/OrdersPage'
import Order from './views/Order'
import Loader from './components/Loader'
import Header from './components/Header'
import firebase from './utils/firebaseConfig'
import { getUser } from './redux/actions/users'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      const user = await dispatch(getUser(userAuth))
      setUser(user)
      setLoading(false)
    })
  }, [])

  console.log('user>>>>>', user)
  return (
    <BrowserRouter>
      <Container fluid className='p-0 bg-lavender vh-100'>
        {/* <ToastContainer/> */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <Switch>
              <Route exact path='/' component={LoginPage} />
              <Route component={Header} />
            </Switch>
            <Route exact path='/orders' render={() => (user ? <OrdersPage /> : <Redirect to='/' />)} />
            <Route exact path='/orders/:orderId' component={Order} />
            {/* <Route exact path='/orders/:orderId' render={() => (user ? <Order /> : <Redirect to='/' />)} /> */}
          </>
        )}
      </Container>
    </BrowserRouter>
  )
}

export default App
