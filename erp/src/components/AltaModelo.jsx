export default function AltaModelo() {
    return (
        <section className="form-section">
            <h2>Agregar / Editar Modelo</h2>
            <form>
                <input type="text" placeholder="Nombre del producto" />
                <input type="text" placeholder="Categoría (ropa, calzado)" />
                <input type="number" placeholder="Precio" />
                <input type="text" placeholder="Talla" />
                <button className="btn-primary">Guardar</button>
            </form>
        </section>
    )
}