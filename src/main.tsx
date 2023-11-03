import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import AuthenticationProvider from './contexts/AuthenticationProvider.tsx'

const root = document.getElementById('root')
if (root == null) throw new Error('Root element not found.')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
      <NextUIProvider>
        <Router>
          <AuthenticationProvider>
            <App />
          </AuthenticationProvider>
        </Router>
      </NextUIProvider>
  </React.StrictMode>
)
