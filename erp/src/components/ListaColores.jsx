import ColorRow from "./ColorRow"
export default function ListaColores({ colores, onEdit, onDelete }) {
    return (
        <section className="table-section">
            {/* <h2>Listado</h2> */}
            <table>
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Estatus</th>
                        <th>Fecha de creación</th>
                        <th>Fecha de actualización</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    colores.map((color) => (
                        <ColorRow
                            key={color.id_color}
                            color={color}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}