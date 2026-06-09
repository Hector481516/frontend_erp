import './ConfirmAlert.css'

function ConfirmAlert({
    isOpen,
    title = 'Confirmar acción',
    message = '¿Deseas continuar?',
    onConfirm,
    onCancel
}) {

    if (!isOpen) return null

    return (
        <div className="confirm-overlay">
            <div className="confirm-box">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-actions">

                    <button
                        className="btn-cancel"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        className="btn-confirm"
                        onClick={onConfirm}
                    >
                        Confirmar
                    </button>

                </div>
            </div>
        </div>
    )
}

export default ConfirmAlert