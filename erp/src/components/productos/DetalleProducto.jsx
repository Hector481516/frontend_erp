import { useState, useEffect } from 'react'
import './DetalleProducto.css?version=8'
import { useProductos } from '../../hooks/useProductos'
import { useModelos } from '../../hooks/useModelos'
import { useTallas } from '../../hooks/useTallas'
import { useModal } from '../../hooks/useModal'
import { createProducto } from '../../services/productos'
import { PATH_IMAGEN_ZAPATOS } from '../../config/env'
import { useAlert } from '../../hooks/useAlert'
import { useConfirm } from '../../hooks/useConfirm'
function DetalleProducto() {
    const { confirm } = useConfirm()
    const { mostrarAlerta } = useAlert()
    const {
        isOpen,
        modalType,
        setIsOpen,
        setModalType
    } = useModal()
    const {
        tallas,
        loading: loadingTallas,
        cargarTallas
    } = useTallas()
    const [filtros, setFiltros] = useState({
        ordenamiento: 'fecha_alta'
    })
    const {
        modelos,
        loading: loadingModelos
    } = useModelos(filtros)
    const [busqueda, setBusqueda] = useState('')
    const [productosUI, setProductosUI] = useState([])
    useEffect(() => {
        if (modelos.length > 0) {
            setProductosUI(
                modelos.map(item => ({
                    ...item,
                    nombre_talla: '',
                    id_talla: '',
                    cantidad: 1
                }))
            )
        }
    }, [modelos])
    const modelosFiltrados = productosUI.filter((producto) => {
        const texto = busqueda.toLowerCase()
        return (
            String(producto?.clave || '')
                .toLowerCase()
                .includes(texto) ||

            String(producto?.modelo || '')
                .toLowerCase()
                .includes(texto) ||

            String(producto?.marca || '')
                .toLowerCase()
                .includes(texto)
        )
    })
    const [carrito, setCarrito] = useState([])
    function actualizarCampo(id, campo, valor) {
        setProductosUI(prev =>
            prev.map(item =>
                item.id_modelo_detalle === id
                    ? {
                        ...item,
                        [campo]: valor,
                        id_talla: campo === 'id_talla' ? valor : item.id_talla,
                        precio_compra: campo === 'precio_compra' ? valor : item.precio_compra,
                        precio_venta: campo === 'precio_venta' ? valor : item.precio_venta,
                    }
                    : item
            )
        )
    }
    function agregarProducto(producto) {
        if (!producto.id_talla) return mostrarAlerta("Error, debe seleccionar una talla", 'warning')
        if (producto.cantidad < 1 || !producto.cantidad) return mostrarAlerta("Error, debe seleccionar cantidad", 'warning')
        if (!producto.precio_venta) return mostrarAlerta("Error, debe seleccionar precio de venta", 'warning')
        if (!producto.precio_compra) return mostrarAlerta("Error, debe seleccionar precio de compra", 'warning')
        const tallaSeleccionada = tallas.find(
            t => t.id_talla == producto.id_talla
        )
        const nuevo = {
            id: Date.now(),
            modelo: producto.modelo,
            clave: producto.clave,
            nombre_talla: tallaSeleccionada?.nombre_talla || '',
            cantidad: producto.cantidad,
            precio_venta: producto.precio_venta,
            precio_compra: producto.precio_compra,
            imagen: PATH_IMAGEN_ZAPATOS + producto.imagen,
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
        confirm({
            title: 'Eliminar producto',
            message: '¿Deseas guardar los productos?',
            onConfirm: async () => {
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
                    setIsOpen(false)
                    cargarModelos()
                    mostrarAlerta("Productos guardados exitosamente", 'success')
                } catch (error) {
                    console.error("Error al cargar productos:", error)
                }

            }
        })
    }
    return (
        <div className="nuevo-producto-page">
            <div className="nuevo-producto-container">
                {/* TABLA PRODUCTOS */}
                <div className="contenido-principal">
                    <div className="productos-section">
                        <div className="section-title">
                            <h3>
                                Modelos activos
                            </h3>
                            <input
                                type="text"
                                className="input-filtro"
                                placeholder="Buscar clave, modelo o marca..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>
                        <div className="productos-table">
                            {modelosFiltrados.map((producto) => (
                                <div
                                    className="producto-row"
                                    key={producto.id_modelo_detalle}
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
                                        value={producto.id_talla || ''}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                producto.id_modelo_detalle,
                                                'id_talla',
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
                                                producto.id_modelo_detalle,
                                                'cantidad',
                                                e.target.value
                                            )
                                        }
                                    />
                                    {/* COSTO */}
                                    <input
                                        type="number"
                                        min={1}
                                        placeholder="Precio venta"
                                        value={producto.precio_venta}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                producto.id_modelo_detalle,
                                                'precio_venta',
                                                e.target.value
                                            )
                                        }
                                    />
                                    <input
                                        type="number"
                                        min={1}
                                        placeholder="Precio compra"
                                        value={producto.precio_compra}
                                        onChange={(e) =>
                                            actualizarCampo(
                                                producto.id_modelo_detalle,
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
                    <div className="carrito-section carrito">
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
                                                src={`${item.imagen}`}
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
                                            Talla {item.nombre_talla}
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
                        <div className='btn-guarda-productos'>
                            <button className="save-button" onClick={() => guardarProductos(carrito)}>
                                Guardar productos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto