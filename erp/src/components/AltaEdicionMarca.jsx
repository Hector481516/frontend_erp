import { useState, useEffect } from "react"

export default function AltaEdicionMarcas({
    mode = "create",
    marca = null,
    onSubmit,
    confirmDelete
}) {
    const emptyForm = {
        nombre_marca: ""
    }
    const [formData, setFormData] = useState(emptyForm)
    useEffect(() => {
        if (marca) {
            setFormData(marca)
        } else {
            setFormData(emptyForm)
        }
    }, [marca])
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
                <p>¿Estás seguro de que deseas eliminar esta marca?</p>
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
                    name="nombre_marca"
                    placeholder="Nombre de la marca"
                    value={formData.nombre_marca}
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