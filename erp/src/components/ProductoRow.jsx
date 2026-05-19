import { useState } from "react"
function ProductoRow({ producto, onEdit, onDelete }) {
    const [productoSeleccionado, setProductoSeleccionado] = useState(producto);
    const { descripcion, clasificacion, clave, tallas, modelo, color, precio_compra, precio_venta, creacion, actualizacion, marca} = producto;
    return (
        <tr>
            <td>{descripcion}</td>
            <td>{clasificacion}</td>
            <td>{clave}</td>
            <td>{modelo}</td>
            <td>{marca}</td>
            <td>{color}</td>
            <td>{tallas}</td>
            <td>${precio_compra}</td>
            <td>${precio_venta}</td>
            <td>{creacion}</td>
            <td>
                <button className="btn-edit" onClick={() => onEdit(producto)}>
                    Editar
                </button>
                <button className="btn-delete" onClick={() => onDelete(producto)} >Eliminar</button>
            </td>
        </tr>
    )
}
export default ProductoRow