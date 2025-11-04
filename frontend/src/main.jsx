import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from './views/Home/Home'
import { Login } from './views/Login/Login'
import { RouterApp } from './router/RouterApp'
import { AuthProvider } from './context/authContext'
import "./style.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterApp/> 
    </AuthProvider>
  </StrictMode>,
)
