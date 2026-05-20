import { useState } from "react"
import { PATH_IMAGEN_ZAPATOS } from '../config/env'
import '../styles/modelos.css'
function ModeloRow({ modelo, onEdit, onDelete }) {
    const [modeloSeleccionado, setModeloSeleccionado] = useState(modelo);
    const { descripcion,creacion, color, imagen, numero_modelo, tipo_descripcion, clave, clasificacion, marca } = modelo;
    return (
        <tr>
            <td>
                <img
                      src={`${PATH_IMAGEN_ZAPATOS}${imagen}`}
                      alt={imagen}
                      className="modelo-image"
                    />
            </td>
            <td>{marca}</td>
            <td>{descripcion}</td>
            <td>{clasificacion}</td>
            <td>{clave}</td>
            <td>{numero_modelo}</td>
            <td>{color}</td>
            <td>{creacion}</td>
            <td>
                <button className="btn-edit" onClick={() => onEdit(modelo)}>
                    Editar
                </button>
                <button className="btn-delete" onClick={() => onDelete(modelo)} >Eliminar</button>
            </td>
        </tr>
    )
}
export default ModeloRow