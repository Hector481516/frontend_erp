import { createContext, useState } from 'react'
import ConfirmModal from '../components/confirm/ConfirmAlert'

export const ConfirmContext = createContext()

export function ConfirmProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [confirmState, setConfirmState] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    })
    function confirm({
        title,
        message,
        onConfirm
    }) {
        setConfirmState({
            isOpen: true,
            title,
            message,
            onConfirm
        })
    }
    function closeConfirm() {
        setConfirmState(prev => ({
            ...prev,
            isOpen: false
        }))
    }
    async function handleConfirm() {
        try {
            setLoading(true)
            await confirmState.onConfirm?.()
            closeConfirm()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <ConfirmModal
                isOpen={confirmState.isOpen}
                title={confirmState.title}
                message={confirmState.message}
                loading={loading}
                onCancel={closeConfirm}
                onConfirm={handleConfirm}
            />
        </ConfirmContext.Provider>
    )
}