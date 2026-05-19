import { useState, useEffect } from "react"

export default function AltaEdicionProductos({
    mode = "create",
    producto = null,
    onSubmit,
    confirmDelete
}) {
    const emptyForm = {
        nombre_producto: ""
    }
    const [formData, setFormData] = useState(emptyForm)
    useEffect(() => {
        if (producto) {
            setFormData(producto)
        } else {
            setFormData(emptyForm)
        }
    }, [producto])
    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(formData)
    }
    function handleDelete(e) {
        e.preventDefault()
        confirmDelete(formData)
    }
    if (mode === "delete") {
        return (
            <section className="form-section">
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
                <button className="btn-danger" onClick={handleDelete}>
                    Confirmar Eliminación
                </button>
            </section>
        )
    }
    return (
        <section className="form-section">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="nombre_producto"
                    placeholder="Nombre del producto"
                    value={formData.nombre_producto}
                    onChange={handleChange}
                />
                <button className="btn-primary" type="submit">
                    {
                        mode === "edit"
                            ? "Actualizar"
                            : "Guardar"
                    }
                </button>
            </form>
        </section>
    )
}