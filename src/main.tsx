import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'           // Original static table
import AppWithDynamic from './AppWithDynamic.tsx'  // Enhanced demo with all table types

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithDynamic />
  </StrictMode>,
)
