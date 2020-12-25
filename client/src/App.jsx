import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import LoginPage from './views/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
      {/* <ToastContainer /> */}
      <Container fluid className="p-0 bg-lavender">
        <Switch>
          <Route path="/" component={LoginPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
