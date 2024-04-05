import React from 'react'
import ReactDOM from 'react-dom/client'
import { BasketApp } from './BasketApp'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <BasketApp />
    </React.StrictMode>,
  </BrowserRouter>
)
