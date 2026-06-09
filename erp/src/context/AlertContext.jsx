import { createContext, useState } from 'react'

export const AlertContext = createContext()

export function AlertProvider({ children }) {

    const [alerta, setAlerta] = useState({
        open: false,
        message: '',
        type: 'info'
    })

    function mostrarAlerta(message, type = 'info') {

        setAlerta({
            open: true,
            message,
            type
        })

        setTimeout(() => {
            cerrarAlerta()
        }, 3000)
    }

    function cerrarAlerta() {
        setAlerta(prev => ({
            ...prev,
            open: false
        }))
    }

    return (
        <AlertContext.Provider
            value={{
                alerta,
                mostrarAlerta,
                cerrarAlerta
            }}
        >
            {children}
        </AlertContext.Provider>
    )
}