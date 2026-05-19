import { useEffect } from 'react'
function Modal({ modelo, isOpen, onClose, title, children, size }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])
    if (!isOpen) return null
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-container ${size || 'modal-md'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">

                    <h2>{title}</h2>
                    <button
                        className="modal-close-btn"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>

            </div>

        </div>
    )
}

export default Modal