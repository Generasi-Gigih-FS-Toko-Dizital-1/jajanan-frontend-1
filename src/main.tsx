import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from './contexts/auth-provider'

const root = document.getElementById('root')
if (root == null) throw new Error('Root element not found.')
ReactDOM.createRoot(root).render(
  <React.StrictMode>
      <NextUIProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/*' element={<App />} />
            </Routes>
          </AuthProvider>
        </Router>
      </NextUIProvider>
  </React.StrictMode>
)
