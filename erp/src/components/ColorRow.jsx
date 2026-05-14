import { useState } from "react"
function ColorRow({ color, onEdit, onDelete }) {
    const [colorSeleccionado, setColorSeleccionado] = useState(color);
    const { creacion,actualizacion,nombre_color,estatus } = color;
    return (
        <tr>
            <td>{nombre_color}</td>
            <td>{estatus}</td>
            <td>{creacion}</td>
            <td>{actualizacion}</td>
            <td>
                <button className="btn-edit" onClick={() => onEdit(color)}>
                    Editar
                </button>
                <button className="btn-delete" onClick={() => onDelete(color)} >Eliminar</button>
            </td>
        </tr>
    )
}
export default ColorRow