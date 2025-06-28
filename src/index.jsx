import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { RootCmp } from './RootCmp'

import { MapsKeyContext } from './contexts/MapsKeyContext'

import './assets/styles/main.scss'
import { getGoogleApiKey } from './customHooks/getGoogleApiKey'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { setupSocket } from './services/socket.service'
setupSocket(store)

function App() {
  const apiKey = getGoogleApiKey()

  if (!apiKey) return null

  return (
    <MapsKeyContext.Provider value={apiKey}>
      <Provider store={store}>
        <BrowserRouter>
          <RootCmp />
        </BrowserRouter>
      </Provider>
    </MapsKeyContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
