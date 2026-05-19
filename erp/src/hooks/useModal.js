import { useEffect, useState } from 'react'

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState("create")
    return {
        isOpen,
        modalType,
        setIsOpen,
        setModalType
    }
}