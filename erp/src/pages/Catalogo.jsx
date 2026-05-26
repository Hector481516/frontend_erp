import '../styles/catalogo.css'
import { useEffect, useState } from 'react'
import { getProductos } from '../services/productos'
import { PATH_IMAGEN_ZAPATOS } from '../config/env'
import { useTallas } from '../hooks/useTallas'
import { descargarCatalogoPDF } from '../services/catalogo'
function Catalogo() {
    const [productos, setProductos] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [marca, setMarca] = useState('')
    const [clasificacion, setClasificacion] = useState('')
    const [talla, setTalla] = useState('')
    const {
        tallas
    } = useTallas()
    useEffect(() => {
        cargarCatalogo()
    }, [])
    async function generarPDF() {

        try {

            const data =
                await descargarCatalogoPDF()

            const url =
                window.URL.createObjectURL(data)

            const link =
                document.createElement('a')

            link.href = url

            link.download = 'catalogo.pdf'

            link.click()

        } catch (error) {

            console.error(error)

        }

    }
    async function cargarCatalogo() {
        try {

            const data = await getProductos()
            setProductos(data.records)
        } catch (error) {
            console.error(error)
        }
    }
    const productosFiltrados = productos.filter((item) => {
        const texto = `
        ${item.modelo}
        ${item.marca}
    `.toLowerCase()
        const coincideBusqueda =
            texto.includes(
                busqueda.toLowerCase()
            )
        const coincideMarca =
            !marca ||
            item.marca === marca
        const coincideClasificacion =
            !clasificacion ||
            item.clasificacion === clasificacion
        const coincideTalla =
            !talla ||
            item.tallas?.includes(
                Number(talla)
            )
        return (
            coincideBusqueda &&
            coincideMarca &&
            coincideClasificacion &&
            coincideTalla
        )
    })
    const marcas = [
        ...new Set(
            productos.map(
                item => item.marca
            )
        )
    ]
    const clasificaciones = [
        ...new Set(
            productos.map(
                item => item.clasificacion
            )
        )
    ]
    return (
        <div className="catalogo-page">
            {/* HEADER */}
            <div className="catalogo-header">
                <div>
                    <h1>
                        Catálogo
                    </h1>
                    <p>
                        Explora modelos disponibles
                    </p>
                </div>
                <button className="catalogo-pdf-btn"
                    onClick={generarPDF}>
                    Generar PDF
                </button>
            </div>
            {/* FILTROS */}
            <div className="catalogo-filtros">
                {/* BUSCADOR */}
                <input
                    type="text"
                    placeholder="Buscar modelo o marca..."
                    value={busqueda}
                    onChange={(e) =>
                        setBusqueda(e.target.value)
                    }
                />
                {/* MARCA */}
                <select
                    value={marca}
                    onChange={(e) =>
                        setMarca(e.target.value)
                    }
                >
                    <option value="">
                        Todas las marcas
                    </option>
                    {marcas.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
                {/* CLASIFICACION */}
                <select
                    value={clasificacion}
                    onChange={(e) =>
                        setClasificacion(e.target.value)
                    }
                >
                    <option value="">
                        Todas las categorías
                    </option>
                    {clasificaciones.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item}
                        </option>
                    ))}
                </select>
                {/* TALLA */}
                <select
                    value={talla}
                    onChange={(e) =>
                        setTalla(e.target.value)
                    }
                >

                    <option value="">
                        Todas las tallas
                    </option>

                    {tallas.map((item) => (

                        <option
                            key={item.id_talla}
                            value={item.nombre_talla}
                        >
                            {item.nombre_talla}
                        </option>

                    ))}

                </select>
            </div>
            {/* GRID */}
            <div className="catalogo-grid">
                {productosFiltrados.map((item) => (
                    <div
                        className="catalogo-card"
                        key={item.id_modelo_detalle}
                    >
                        {/* IMAGEN */}
                        <div className="catalogo-img-container">
                            <img
                                src={item.imagen}
                                alt={item.modelo}
                                className="catalogo-img"
                            />
                        </div>
                        <div className="catalogo-badge">
                            Disponible
                        </div>
                        {/* INFO */}
                        <div className="catalogo-info">
                            <span className="catalogo-marca">
                                {item.marca}
                            </span>
                            <h3>
                                {item.descripcion}
                            </h3>
                            <p className="catalogo-color">
                                {item.color}
                            </p>
                            <div className="catalogo-precio">
                                Desde:
                                <strong>
                                    ${item.precio_venta}
                                </strong>
                            </div>
                            {/* TALLAS */}
                            <div className="catalogo-tallas">
                                {item.tallas?.map((talla) => (
                                    <span
                                        key={talla.id_talla}
                                        className="talla-chip"
                                    >
                                        {talla.talla}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Catalogo