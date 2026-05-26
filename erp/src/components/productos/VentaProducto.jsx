import { useState } from "react"
function VentaProducto({ producto, tallas = [], onGuardarVenta }) {
    const [formVenta, setFormVenta] = useState({
        id_talla: 0,
        precio_venta: ''
    })
    function handleSubmit() {
        onGuardarVenta(formVenta)
    }
    return (
        <div>
            <h2>Captura de Venta</h2>
            {
                <section className="form-section">
                    <input
                        type="text"
                        placeholder="Precio de venta"
                        name="precio_venta"
                        value={formVenta.precio_venta}
                        onChange={
                            (e) => setFormVenta({
                                ...formVenta,
                                precio_venta: e.target.value
                            })
                        } />
                    <select
                        value={formVenta.id_talla}
                        onChange={(e) =>
                            setFormVenta({
                                ...formVenta,
                                id_talla: e.target.value
                            })
                        }
                    >
                        <option value="">Selecciona talla</option>
                        {
                            Array.isArray(tallas) &&
                            tallas.map((talla) => (
                                <option
                                    key={talla.id_talla}
                                    value={talla.id_talla}>
                                    {talla.talla}
                                </option>
                            ))}
                    </select>
                    <button className="btn-danger" onClick={handleSubmit}>
                        Confirmar Venta
                    </button>
                </section>
            }
        </div>
    )
}

export default VentaProducto