import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TraceBlack from './pages/TraceBlack.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TraceBlack />
  </StrictMode>,
)
