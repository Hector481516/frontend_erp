import { useState, useEffect } from "react"

export default function AltaEdicionModelo({
    mode = "create",
    modelo = null,
    onSubmit,
    confirmDelete
}) {
    const emptyForm = {
        nombre: "",
        categoria: "",
        precio: "",
        talla: ""
    }
    const [formData, setFormData] = useState(emptyForm)
    useEffect(() => {

        if (modelo) {

            setFormData(modelo)

        } else {

            setFormData(emptyForm)

        }

    }, [modelo])
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
                <p>¿Estás seguro de que deseas eliminar este modelo?</p>
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
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoría (ropa, calzado)"
                    value={formData.categoria}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={formData.precio}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="talla"
                    placeholder="Talla"
                    value={formData.talla}
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