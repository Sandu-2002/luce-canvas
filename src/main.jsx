import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { CartProvider } from './cart.jsx'
import './styles.css'
// HashRouter: every page link (/#/shop) works on VS Code Live Server, any host, or even opened from a folder.
createRoot(document.getElementById('root')).render(<HashRouter><CartProvider><App/></CartProvider></HashRouter>)
