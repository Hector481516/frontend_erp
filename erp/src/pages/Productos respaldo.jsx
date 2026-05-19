import '../App.css'
import { useState, useEffect } from 'react'
import AltaEdicionProductos from '../components/AltaEdicionProductos'
import Modal from '../components/Modal'
import ListaProductos from '../components/productos/ListaProductos'
import toggleModal from '../utils/utils'
import { getProductos, createProducto, apiUpdateProducto, apiDeleteProducto } from '../services/productos'
const token = localStorage.getItem("token")

function Productos() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //Estados productos
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productos, setProductos] = useState([]);
    const [listadoProductos, setListadoProductos] = useState(productos);
    useEffect(() => {
        cargarProductos();
    }, []);
    //Estado modal
    const [modalType, setModalType] = useState("create")
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState();
    async function cargarProductos() {
        try {
            const data = await getProductos()
            setProductos(data.records)
        } catch (error) {
            console.error("Error al cargar productos:", error)
        }
    }
    function manejarEdicionProducto(producto) {
        setMarcaSeleccionada(producto)
        setModalType("edit")
        setIsOpen(true)
    }
    function manejarCrearProducto() {
        setIsOpen(true)
        setMarcaSeleccionada(null)
        setModalType("create")
    }
    function manejarEliminarProducto(producto) {
        setIsOpen(true)
        setProductoSeleccionado(producto)
        setModalType("delete")
    }
    function confirmDelete(deleteProducto) {

        const filteredProductos = productos.filter(
            producto => producto.id_producto !== deleteProducto.id_producto
        )
        apiDeleteProducto(deleteProducto.id_producto)
        setProductos(filteredProductos)
        setIsOpen(false)
        cargarProductos()
    }
    function updateProducto(updatedProducto) {
        const updatedProductos = productos.map(producto => {
            if (producto.id_producto === updatedProducto.id_producto) {
                apiUpdateProducto(updatedProducto.id_producto, updatedProducto)
                return updatedProducto
            }
            return producto
        })

        setProductos(updatedProductos)
    }
    function onSubmit(formData) {
        if (modalType === "edit") {
            updateProducto(formData)
            cargarProductos()
        } else {
            createProducto(formData).then(nuevoProducto => {
                // setProductos([...productos, nuevoProducto])
                cargarProductos()
            })
        }
        setIsOpen(false)
    }
    return (
        <div className="container">
            <header className="header">
                <h1>Productos</h1>
                <button className='btn-primary' onClick={() => manejarCrearProducto()}>
                    + Nuevo
                </button>
                <Modal
                    size="modal-sm"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title=
                    {
                        modalType === "edit"
                            ? "Editar Producto"
                            : modalType === "delete"
                                ? "Eliminar Producto"
                                : "Nuevo Producto"
                    }
                >
                    <AltaEdicionProductos
                        key={productoSeleccionado?.id_producto}
                        mode={modalType}
                        producto={productoSeleccionado}
                        onSubmit={onSubmit}
                        confirmDelete={confirmDelete}
                    />
                </Modal>
            </header>

            <ListaProductos
                productos={productos}
                onEdit={manejarEdicionProducto}
                onDelete={manejarEliminarProducto}
            />
        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default Productos
