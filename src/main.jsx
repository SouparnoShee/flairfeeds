import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./styles.scss"
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/userContext.jsx'






export const server = "https://flairfeeds-backend.onrender.com/api/v1"
export const PIF = "https://flairfeeds-backend.onrender.com/profileimages/"
export const IF = "https://flairfeeds-backend.onrender.com/images/"

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>,

)
