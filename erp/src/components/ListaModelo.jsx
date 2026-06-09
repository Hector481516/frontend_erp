import ModeloRow from "./ModeloRow"
export default function ListaModelo({ modelos, onEdit, onDelete }) {
    return (
        <section className="table-section">
            {/* <h2>Listado</h2> */}
            <table className="tabla-modelos">
                <colgroup>
                <col style={{ width: '20%' }} />
                <col style={{ width: '7%' }} />
                <col style={{ width: '13%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
                <col style={{ width: '10%' }} />
            </colgroup>
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