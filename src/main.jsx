import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DictionaryProvider } from './Component/Context/DishnoryApp.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DictionaryProvider>
      {/* <Main/> */}
    <App />

    </DictionaryProvider>
  </React.StrictMode>,
)
