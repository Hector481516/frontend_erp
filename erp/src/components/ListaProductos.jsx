import ProductoRow from "../ProductoRow"
export default function ListaProductos({ productos, onEdit, onDelete }) {
    const tallas = ['25', '26', '27', '28', '29']
    return (
        <section className="table-section">
            {/* <h2>Listado</h2> */}
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Clasificación</th>
                        <th>Clave</th>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Color</th>
                        <th>Tallas disponibles</th>
                        <th>Precio compra</th>
                        <th>Precio venta</th>
                        <th>Fecha de compra</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    productos.map((producto) => (
                        <ProductoRow
                            key={producto.id_modelo_detalle}
                            producto={producto}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}