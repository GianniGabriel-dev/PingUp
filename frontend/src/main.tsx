import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/authProvider.js'
import { router } from './routes/routes.js'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </AuthProvider>

)
