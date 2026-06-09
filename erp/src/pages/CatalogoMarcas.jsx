import '../App.css'
import { useState, useEffect } from 'react'
import AltaEdicionMarcas from '../components/AltaEdicionMarca'
import Modal from '../components/Modal'
import ListaMarcas from '../components/ListaMarcas'
import {toggleModal} from '../utils/utils'
import { getMarcas, createMarca, actualizaMarca, apiDeleteMarca } from '../services/marcas'
const token = localStorage.getItem("token")

function CatalogoMarcas() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //Estados marcas
    const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [listadoMarcas, setListadoMarcas] = useState(marcas);
    useEffect(() => {
        cargarMarcas();
    }, []);
    //Estado modal
    const [modalType, setModalType] = useState("create")
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState();
    async function cargarMarcas() {
        try {
            const data = await getMarcas()
            setMarcas(data.records)
        } catch (error) {
            console.error("Error al cargar marcas:", error)
        }
    }
    function manejarEdicionMarca(marca) {
        setMarcaSeleccionada(marca)
        setModalType("edit")
        setIsOpen(true)
    }
    function manejarCrearMarca() {
        setIsOpen(true)
        setMarcaSeleccionada(null)
        setModalType("create")
    }
    function manejarEliminarMarca(marca) {
        setIsOpen(true)
        setMarcaSeleccionada(marca)
        setModalType("delete")
    }
    function confirmDelete(deleteMarca) {

        const filteredMarcas = marcas.filter(
            marca => marca.id_marca !== deleteMarca.id_marca
        )
        apiDeleteMarca(deleteMarca.id_marca)
        setMarcas(filteredMarcas)
        setIsOpen(false)
        cargarMarcas()
    }
    function updateMarca(updatedMarca) {
        const updatedMarcas = marcas.map(marca => {
            if (marca.id_marca === updatedMarca.id_marca) {
                actualizaMarca(updatedMarca.id_marca, updatedMarca)
                return updatedMarca
            }
            return marca
        })

        setMarcas(updatedMarcas)
    }
    function onSubmit(formData) {
        if (modalType === "edit") {
            updateMarca(formData)
            cargarMarcas()
        } else {
            createMarca(formData).then(nuevaMarca => {
                // setMarcas([...marcas, nuevaMarca])
                cargarMarcas()
            })
        }
        setIsOpen(false)
    }
    return (
        <div className="container">
            <header className="header">
                <h1>Catálogo de Marcas</h1>
                <button className='btn-primary' onClick={() => manejarCrearMarca()}>
                    + Nuevo
                </button>
                <Modal
                    size="modal-sm"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title=
                    {
                        modalType === "edit"
                            ? "Editar Marca"
                            : modalType === "delete"
                                ? "Eliminar Marca"
                                : "Nueva Marca"
                    }
                >
                    <AltaEdicionMarcas
                        key={marcaSeleccionada?.id_marca}
                        mode={modalType}
                        marca={marcaSeleccionada}
                        onSubmit={onSubmit}
                        confirmDelete={confirmDelete}
                    />
                </Modal>
            </header>

            <ListaMarcas
                marcas={marcas}
                onEdit={manejarEdicionMarca}
                onDelete={manejarEliminarMarca}
            />
        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default CatalogoMarcas
