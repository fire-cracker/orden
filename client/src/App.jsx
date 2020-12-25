import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Container from 'react-bootstrap/Container'
import { ToastContainer } from 'react-toastify'

import LoginPage from './views/LoginPage'
import OrdersPage from './views/OrdersPage'
import Loader from './components/Loader'
import firebase from './utils/firebaseConfig'
import { getUser } from './redux/actions/users'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (userAuth) => {
      const user = await dispatch(getUser(userAuth))
      setUser(user)
      setLoading(false)
    })
  }, [])

  return (
    <BrowserRouter>
      <Container fluid className='p-0 bg-lavender vh-100'>
        <ToastContainer/>
        {loading ? (
          <Loader/>
        ) : (
          <Switch>
            <Route path='/orders' render={() => (user ? <OrdersPage /> : <Redirect to='/' />)} />
            <Route path='/' component={LoginPage} />
          </Switch>
        )}
      </Container>
    </BrowserRouter>
  )
}

export default App
