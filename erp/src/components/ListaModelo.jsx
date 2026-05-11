import ModeloRow from "./ModeloRow"
export default function ListaModelo({ modelos, onEdit, onDelete }) {
    return (
        <section className="table-section">
            <h2>Listado</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Talla</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {modelos.map((modelo) => (
                        <ModeloRow
                            key={modelo.id_modelo}
                            modelo={modelo}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}