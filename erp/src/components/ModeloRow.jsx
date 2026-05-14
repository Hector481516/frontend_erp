import { useState } from "react"
function ModeloRow({ modelo, onEdit, onDelete }) {
    const [modeloSeleccionado, setModeloSeleccionado] = useState(modelo);
    const { descripcion,creacion, color, numero_modelo, tipo_descripcion, clave, clasificacion, marca } = modelo;
    return (
        <tr>
            <td>{descripcion}</td>
            <td>{clasificacion}</td>
            <td>{clave}</td>
            <td>{numero_modelo}</td>
            <td>{color}</td>
            <td>{marca}</td>
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