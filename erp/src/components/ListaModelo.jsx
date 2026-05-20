import ModeloRow from "./ModeloRow"
export default function ListaModelo({ modelos, onEdit, onDelete }) {
    return (
        <section className="table-section">
            {/* <h2>Listado</h2> */}
            <table className='table-modelos'>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Marca</th>
                        <th>Descripción</th>
                        <th>Clasificación</th>
                        <th>Clave</th>
                        <th>Modelo</th>
                        <th>Color</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    modelos.map((modelo) => (
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