import { useState, useEffect, use } from "react"
import { getMarcas } from '../services/marcas'
import { getColores } from '../services/colores'
import {getClasificacion} from '../services/modelos'


export default function AltaEdicionModelo({
    mode = "create",
    modelo = null,
    onSubmit,
    confirmDelete
}) {
    const emptyForm = {
        nombre: "",
        clasificacion: "",
        marca: "",
        color: "",
        clave: "",
        modelo: "",
    }
    const [marcas, setMarcas] = useState([])
    const [colores, setColores] = useState([])
    const [clasificaciones, setClasificaciones] = useState([])
    async function cargarMarcas() {
        try {
            const data = await getMarcas()
            setMarcas(data.records)
        } catch (error) {
            console.error("Error al cargar marcas:", error)
        }
    }
    async function cargarClasificaciones() {
        try {
            const data = await getClasificacion()
            setClasificaciones(data.records)
        } catch (error) {
            console.error("Error al cargar clasificaciones:", error)
        }
    }
    async function cargarColores() {
        try {
            const data = await getColores()
            setColores(data.records)
        } catch (error) {
            console.error("Error al cargar colores:", error)
        }
    }
    const [formData, setFormData] = useState(emptyForm)
    useEffect(() => {

        if (modelo) {
            setFormData(modelo)

        } else {

            setFormData(emptyForm)
            cargarMarcas()
            cargarColores()
            cargarClasificaciones()
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
                    placeholder="Descripción del modelo"
                    value={formData.nombre}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="modelo"
                    placeholder="Número de modelo"
                    value={formData.modelo}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="clave"
                    placeholder="Clave del modelo"
                    value={formData.clave}
                    onChange={handleChange}
                />
                <select
                    name="clasificacion"
                    value={formData.clasificacion}
                    onChange={handleChange}
                >
                    <option value="">
                        Selecciona una clasificación
                    </option>
                    {
                        clasificaciones.map(clasificacion => (
                            <option
                                key={clasificacion.id_clasificacion}
                                value={clasificacion.id_clasificacion}
                            >
                                {clasificacion.clasificacion}
                            </option>
                        ))
                    }
                </select>
                <select
                    name="marca"
                    value={formData.marca}
                    onChange={handleChange}
                >
                    <option value="">
                        Selecciona una marca
                    </option>
                    {
                        marcas.map(marca => (
                            <option
                                key={marca.id_marca}
                                value={marca.id_marca}
                            >
                                {marca.nombre_marca}
                            </option>
                        ))
                    }
                </select>
                <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                >
                    <option value="">
                        Selecciona un color
                    </option>
                    {
                        colores.map(color => (
                            <option
                                key={color.id_color}
                                value={color.id_color}
                            >
                                {color.nombre_color}
                            </option>
                        ))
                    }
                </select>
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