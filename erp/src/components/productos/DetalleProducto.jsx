import { useState, useEffect } from 'react'
import './DetalleProducto.css'
import { useProductos } from '../../hooks/useProductos'
import { useModelos } from '../../hooks/useModelos'
import { useTallas } from '../../hooks/useTallas'
import { useModal } from '../../hooks/useModal'
import { createProducto } from '../../services/productos'
import { PATH_IMAGEN_ZAPATOS } from '../../config/env'
function DetalleProducto() {
    const {
        productos,
        loading,
        cargarProductos
    } = useProductos()
    const {
        tallas,
        loading: loadingTallas,
        cargarTallas
    } = useTallas()
    const {
        modelos,
        loading: loadingModelos,
        cargarModelos
    } = useModelos()
    const {
        isOpen,
        modalType,
        setIsOpen,
        setModalType
    } = useModal()
    const [productosUI, setProductosUI] = useState([])
    useEffect(() => {
        if (productos.length > 0) {
            setProductosUI(
                productos.map(item => ({
                    ...item,
                    talla: '',
                    cantidad: 1
                }))
            )
        }
    }, [productos])
    const [carrito, setCarrito] = useState([])
    function actualizarCampo(id, campo, valor) {
        setProductosUI(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        [campo]: valor,
                        id_talla: campo === 'talla' ? valor : item.id_talla,
                        precio_compra: campo === 'precio_compra' ? valor : item.precio_compra,
                        precio_venta: campo === 'precio_venta' ? valor : item.precio_venta,
                    }
                    : item
            )
        )
    }

    function agregarProducto(producto) {
        if (!producto.talla) return alert("Selecciona una talla")
        if (!producto.cantidad) return

        const nuevo = {
            id: Date.now(),
            modelo: producto.modelo,
            clave: producto.clave,
            talla: producto.talla,
            cantidad: producto.cantidad,
            precio_venta: producto.precio_venta,
            precio_compra: producto.precio_compra,
            imagen: producto.imagen,
            id_modelo_detalle: producto.id_modelo_detalle,
            id_talla: producto.id_talla
        }

        setCarrito(prev => [
            ...prev,
            nuevo
        ])
    }

    function eliminarProducto(id) {
        setCarrito(prev =>
            prev.filter(item => item.id !== id)
        )
    }
    async function guardarProductos(carrito) {
        const productosEnviar = carrito.map(item => ({
            id_modelo_detalle: item.id_modelo_detalle,
            id_talla: parseInt(item.id_talla),
            cantidad: parseInt(item.cantidad),
            precio_compra: parseFloat(item.precio_compra),
            precio_venta: parseFloat(item.precio_venta)
        }))
        try {
            await createProducto(productosEnviar)
            console.log("Guardando productos:", productosEnviar)
            // setIsOpen(false)
        } catch (error) {
            console.error("Error al cargar productos:", error)
        }

        // Aquí iría la lógica para enviar los productos al backend
    }
    return (
        <div className="nuevo-producto-page">
            <div className="nuevo-producto-container">
                {/* HEADER */}
                <div className="nuevo-header">
                    <div>
                        <h1>
                            Nuevo inventario
                        </h1>
                        <p>
                            Agrega productos rápidamente
                        </p>
                    </div>
                    <button className="save-button" onClick={() => guardarProductos(carrito)}>
                        Guardar productos
                    </button>
                </div>
                {/* TABLA PRODUCTOS */}
                <div className="productos-section">
                    <div className="section-title">
                        <h3>
                            Modelos disponibles
                        </h3>
                    </div>
                    <div className="productos-table">
                        {productosUI.map((producto) => (
                            <div
                                className="producto-row"
                                key={producto.id}
                            >
                                {/* MINI CARD */}
                                <div className="producto-info">
                                    <img
                                        src={`${PATH_IMAGEN_ZAPATOS}${producto.imagen}`}
                                        alt={producto.modelo}
                                    />
                                    <div>
                                        <span>
                                            {producto.clave}
                                        </span>
                                        <h4>
                                            {producto.modelo}
                                        </h4>
                                        <p>
                                            {producto.marca} · {producto.color}
                                        </p>
                                    </div>
                                </div>
                                {/* TALLA */}
                                <select
                                    value={producto.talla}
                                    onChange={(e) =>
                                        actualizarCampo(
                                            producto.id,
                                            'talla',
                                            e.target.value
                                        )
                                    }
                                >
                                    <option value="">
                                        Talla
                                    </option>
                                    {tallas.map((talla) => (
                                        <option
                                            key={talla.id_talla}
                                            value={talla.id_talla}
                                        >
                                            {talla.nombre_talla}
                                        </option>
                                    ))}
                                </select>
                                {/* CANTIDAD */}
                                <input
                                    type="number"
                                    min={1}
                                    value={producto.cantidad}
                                    onChange={(e) =>
                                        actualizarCampo(
                                            producto.id,
                                            'cantidad',
                                            e.target.value
                                        )
                                    }
                                />
                                {/* COSTO */}
                                <input
                                    type="number"
                                    placeholder="Precio venta"
                                    value={producto.precio_venta}
                                    onChange={(e) =>
                                        actualizarCampo(
                                            producto.id,
                                            'precio_venta',
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    type="number"
                                    placeholder="Precio compra"
                                    value={producto.precio_compra}
                                    onChange={(e) =>
                                        actualizarCampo(
                                            producto.id,
                                            'precio_compra',
                                            e.target.value
                                        )
                                    }
                                />
                                {/* BOTON */}
                                <button
                                    className="add-button"
                                    onClick={() =>
                                        agregarProducto(producto)
                                    }
                                >
                                    Agregar
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                {/* CARRITO */}
                <div className="carrito-section">
                    <div className="section-title">
                        <h3>
                            Productos agregados
                        </h3>
                        <span>
                            {carrito.length} registros
                        </span>
                    </div>
                    {carrito.length === 0 ? (
                        <div className="empty-state">
                            No hay productos agregados
                        </div>
                    ) : (
                        <div className="carrito-table">
                            {carrito.map((item) => (
                                <div
                                    className="carrito-row"
                                    key={item.id}
                                >
                                    <div className="carrito-info">
                                        <img
                                            src={`${PATH_IMAGEN_ZAPATOS}${item.imagen}`}
                                            alt={item.modelo}
                                        />
                                        <div>
                                            <h4>
                                                {item.modelo}
                                            </h4>
                                            <p>
                                                {item.clave}
                                            </p>
                                        </div>
                                    </div>
                                    <span>
                                        Talla {item.talla}
                                    </span>
                                    <span>
                                        {item.cantidad} piezas
                                    </span>
                                    <span>
                                        ${item.precio_venta || 0}
                                    </span>
                                    <span>
                                        ${item.precio_compra || 0}
                                    </span>
                                    <button
                                        className="delete-button"
                                        onClick={() =>
                                            eliminarProducto(item.id)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto