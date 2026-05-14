import { useState } from "react"
function MarcaRow({ marca, onEdit, onDelete }) {
    const [marcaSeleccionada, setMarcaSeleccionada] = useState(marca);
    const { creacion,actualizacion,nombre_marca,estatus } = marca;
    return (
        <tr>
            <td>{nombre_marca}</td>
            <td>{estatus}</td>
            <td>{creacion}</td>
            <td>{actualizacion}</td>
            <td>
                <button className="btn-edit" onClick={() => onEdit(marca)}>
                    Editar
                </button>
                <button className="btn-delete" onClick={() => onDelete(marca)} >Eliminar</button>
            </td>
        </tr>
    )
}
export default MarcaRow