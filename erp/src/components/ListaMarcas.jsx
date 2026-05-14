import MarcaRow from "./MarcaRow"
export default function ListaMarcas({ marcas, onEdit, onDelete }) {
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
                    marcas.map((marca) => (
                        <MarcaRow
                            key={marca.id_marca}
                            marca={marca}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </section>
    )
}