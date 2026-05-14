import '../App.css'
import { useState, useEffect } from 'react'
import AltaEdicionModelo from '../components/AltaEdicionModelo'
import Modal from '../components/Modal'
import ListaModelo from '../components/ListaModelo'
import toggleModal from '../utils/utils'
import { getModelos, createModelo } from '../services/modelos'
const token = localStorage.getItem("token")

function CatalogoModelos() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //Estados modelos
    const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
    const [modelos, setModelos] = useState([]);
    const [listadoModelos, setListadoModelos] = useState(modelos);
    useEffect(() => {
        cargarModelos();
    }, []);
    //Estado modal
    const [modalType, setModalType] = useState("create")
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState();
    async function cargarModelos() {
        try {
            const data = await getModelos()
            setModelos(data.records)
        } catch (error) {
            console.error("Error al cargar modelos:", error)
        }
    }
    function manejarEdicionModelo(modelo) {
        setModeloSeleccionado(modelo)
        setIsOpen(true)
        setModalType("edit")
    }
    function manejarCrearModelo() {
        setIsOpen(true)
        setModeloSeleccionado(null)
        setModalType("create")
    }
    function manejarEliminarModelo(modelo) {
        setIsOpen(true)
        setModeloSeleccionado(modelo)
        setModalType("delete")
    }
    function confirmDelete(deleteModelo) {

        const filteredModels = modelos.filter(
            modelo => modelo.id_modelo !== deleteModelo.id_modelo
        )
        setModelos(filteredModels)
        setIsOpen(false)
    }
    function updateModelo(updatedModelo) {
        const updatedModelos = modelos.map(modelo => {
            if (modelo.id_modelo === updatedModelo.id_modelo) {
                //Aquí se podría hacer la llamada a la API para actualizar el modelo en el backend
                return updatedModelo
            }
            return modelo
        })

        setModelos(updatedModelos)
    }
    function onSubmit(formData) {
        if (modalType === "edit") {
            updateModelo(formData)
        } else {
            createModelo(formData).then(nuevoModelo => {
                cargarModelos()
            })
        }
        setIsOpen(false)
    }
    return (
        <div className="container">
            <header className="header">
                <h1>Catálogo de Modelos</h1>
                <button className='btn-primary' onClick={() => manejarCrearModelo()}>
                    + Nuevo
                </button>
                <Modal
                    size="modal-lg"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title=
                    {
                        modalType === "edit"
                            ? "Editar Modelo"
                            : modalType === "delete"
                                ? "Eliminar Modelo"
                                : "Nuevo Modelo"
                    }
                >
                    <AltaEdicionModelo
                        mode={modalType}
                        modelo={modeloSeleccionado}
                        onSubmit={onSubmit}
                        confirmDelete={confirmDelete}
                    />
                </Modal>
            </header>

            <ListaModelo
                modelos={modelos}
                onEdit={manejarEdicionModelo}
                onDelete={manejarEliminarModelo}
            />
        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default CatalogoModelos
