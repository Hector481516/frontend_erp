import { useState } from "react"
function ModeloRow({ modelo, onEdit, onDelete }) {
    const [modeloSeleccionado, setModeloSeleccionado] = useState(modelo);
    const { nombre, categoria, precio, talla } = modelo;
    return (
        <tr>
            <td>{nombre}</td>
            <td>{categoria}</td>
            <td>${precio}</td>
            <td>{talla}</td>
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