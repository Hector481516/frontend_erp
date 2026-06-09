import { useEffect, useRef } from 'react'
function Modal({ modelo, isOpen, onClose, title, children, size }) {
    const modalRef = useRef();
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
    useEffect(() => {
        const handleMouseDown = (event) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target)
            ) {
                cerrarModal();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);
    if (!isOpen) return null
    return (
        <div className="modal-overlay" onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div
                className={`modal-container ${size || 'modal-md'}`}
                onMouseDown={(e) => e.stopPropagation()}
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