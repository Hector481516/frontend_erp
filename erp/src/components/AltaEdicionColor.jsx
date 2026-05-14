import { useState, useEffect } from "react"

export default function AltaEdicionColores({
    mode = "create",
    color = null,
    onSubmit,
    confirmDelete
}) {
    const emptyForm = {
        nombre_color: ""
    }
    const [formData, setFormData] = useState(emptyForm)
    useEffect(() => {
        if (color) {
            setFormData(color)
        } else {
            setFormData(emptyForm)
        }
    }, [color])
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
                <p>¿Estás seguro de que deseas eliminar este color?</p>
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
                    name="nombre_color"
                    placeholder="Nombre del color"
                    value={formData.nombre_color}
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