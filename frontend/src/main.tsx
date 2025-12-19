import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/authProvider.js'
import { router } from './routes/routes.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router}/>
    </StrictMode>
  </AuthProvider>
 </QueryClientProvider>
)
