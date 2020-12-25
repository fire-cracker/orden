import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import LoginPage from './views/LoginPage'
import OrdersPage from './views/OrdersPage'

const App = () => {
  return (
    <BrowserRouter>
      <Container fluid className="p-0 bg-lavender vh-100">
        <Switch>
          <Route path="/orders" component={OrdersPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
