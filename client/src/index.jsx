import React from 'react'
import { render } from 'react-dom'

import Provider from './provider'
import reportWebVitals from './reportWebVitals'
import App from './App'
import './index.scss'


render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
