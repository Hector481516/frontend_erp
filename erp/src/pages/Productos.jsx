import ProductCard from '../components/productos/CardProducto'
import '../styles/productos.css'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getProductos, apiMarcarVenta} from '../services/productos'
import { useProductos } from '../hooks/useProductos'
import { useInventario } from '../hooks/useInventario'
import { useModal } from '../hooks/useModal'
import DetalleProducto from '../components/productos/DetalleProducto'
import VentaProducto from '../components/productos/VentaProducto'
function Productos() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const {
        productos,
        loading,
        cargarProductos
    } = useProductos()
    const [busqueda, setBusqueda] = useState('')
    const productosFiltrados = productos.filter((producto) => {
        const texto = busqueda.toLowerCase()
        return (
            String(producto.clave).toLowerCase().includes(texto) ||
            String(producto.modelo).toLowerCase().includes(texto) ||
            producto.marca?.toLowerCase().includes(texto)
        )
    })
    const {
        isOpen,
        modalType,
        setIsOpen,
        setModalType
    } = useModal()
    const getTallasByProductoId= useInventario().getTallasByProductoId
    function eventoNuevoProducto() {
        setIsOpen(true)
        setModalType("nuevo")
    }
    const [tallasDisponiblesPorModelo, setTallasDisponiblesPorModelo] = useState([])
    async function onGuardarVenta(formVenta) {
        // Aquí puedes manejar la lógica para guardar la venta, por ejemplo, enviando los datos a tu backend
        await apiMarcarVenta(productoSeleccionado.id_modelo_detalle, formVenta)
        await cargarProductos()
        setIsOpen(false)
    }
    async function onSubmit() {
        setIsOpen(false)
        await cargarProductos()
    }
    async function manejarCapturarVenta(producto)
    {
        setIsOpen(true)
        const tallas=await getTallasByProductoId(producto.id_modelo_detalle)
        setTallasDisponiblesPorModelo(tallas)
        setProductoSeleccionado(producto)
        setModalType("venta")
    }
    return (
        <div className="productos-page">
            <div className="productos-header">
                <div>
                    <h1>
                        Productos
                    </h1>

                    <p>
                        Gestiona el inventario de modelos y tallas.
                    </p>
                </div>
                <button className="new-product-button" onClick={eventoNuevoProducto}>
                    + Agregar producto
                </button>
                <Modal
                    size="modal-lg"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title=
                    {
                        modalType === "edit"
                            ? "Editar Producto"
                            : "Nuevo Producto"
                    }
                >
                    {modalType === "nuevo" && (
                        <DetalleProducto
                            mode={modalType}
                            producto={productoSeleccionado}
                            onSubmit={onSubmit}
                        />
                    )}

                    {
                        modalType === "venta" && (
                        <VentaProducto 
                            producto={productoSeleccionado}
                            tallas={tallasDisponiblesPorModelo}
                            onGuardarVenta={onGuardarVenta}
                        />
                    )}
                </Modal>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por modelo, clave o marca..."
                    className="search-input"
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>
            {
                loading
                    ? (
                        <div>
                            Cargando productos...
                        </div>
                    )
                    : (
                        <div className="products-grid">
                            {productosFiltrados.map((product) => (
                                <ProductCard
                                    manejarCapturaVenta={manejarCapturarVenta}
                                    key={product.id_modelo_detalle}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
        </div>
    )
}
export default Productos