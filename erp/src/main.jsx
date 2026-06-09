import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AlertProvider } from './context/AlertContext'
import { ConfirmProvider } from './context/ConfirmContext'
import './index.css'
import App from './App.jsx'
import {
    BrowserRouter
} from "react-router-dom"

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AlertProvider>
                <ConfirmProvider>
                    <App />
                </ConfirmProvider>
            </AlertProvider>
        </BrowserRouter>
    </StrictMode>,
)
