import './Alert.css'
import { useAlert } from '../../hooks/useAlert'

function Alert() {

    const { alerta } = useAlert()

    if (!alerta.open) return null

    return (
        <div className={`alert alert-${alerta.type}`}>
            {alerta.message}
        </div>
    )
}

export default Alert