import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import '@schedule-x/theme-default/dist/index.css'

import './main.css';


createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
