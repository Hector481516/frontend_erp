import ProductCard from '../components/productos/CardProducto'
import '../styles/productos.css'
import { useState, useEffect } from 'react'
import Modal from '../components/Modal'
import { getProductos } from '../services/productos'
import { useProductos } from '../hooks/useProductos'
import { useModal } from '../hooks/useModal'
import DetalleProducto from '../components/productos/DetalleProducto'
function Productos() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const {
        productos,
        loading,
        cargarProductos
    } = useProductos()
    const {
        isOpen,
        modalType,
        setIsOpen,
        setModalType
    } = useModal()
    function eventoNuevoProducto() {
        setIsOpen(true)
    }
    async function onSubmit() {
        setIsOpen(false)
        await cargarProductos()
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
                    <DetalleProducto
                        mode={modalType}
                        producto={productoSeleccionado}
                        onSubmit={onSubmit}
                    />
                </Modal>
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por modelo, clave o marca..."
                    className="search-input"
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
                            {productos.map((product) => (
                                <ProductCard
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