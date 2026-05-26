import '../styles/catalogo.css'
import '../styles/portadaCatalogo.css?version=55'
import { useEffect, useState } from 'react'
import { getProductos } from '../services/productos'
import { PATH_IMAGEN_ZAPATOS } from '../config/env'
import { useTallas } from '../hooks/useTallas'
import { descargarCatalogoPDF } from '../services/catalogo'
import PortadaCatalogo from './PortadaCatalogo'
function CatalogoPDF() {
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
    
    async function cargarCatalogo() {
        try {

            const data = await getProductos()
            setProductos(data.records)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="catalogo-page">
            {/* HEADER */}
            <PortadaCatalogo />
            {/* GRID */}
            <div className="catalogo-grid">
                {productos.map((item) => (
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

export default CatalogoPDF