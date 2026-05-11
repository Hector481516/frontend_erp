import './App.css'
import { useState, useEffect } from 'react'
import AltaEdicionModelo from './components/AltaEdicionModelo'
import Modal from './components/Modal'
import ListaModelo from './components/ListaModelo'
import toggleModal from './utils/utils'
import { db } from './data/db'

function App() {
    //Estados modelos
    const [modeloSeleccionado, setModeloSeleccionado] = useState(null);
    const [listadoModelos, setListadoModelos] = useState(db);
    const [modelos, setModelos] = useState(db);
    useEffect(() => { setModelos(db) }, [listadoModelos])
    //Estado modal
    const [modalType, setModalType] = useState("create")
    const [isOpen, setIsOpen] = useState(false);

    const [auth, setAuth] = useState();
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
    function confirmDelete(modelo) {

        const filteredProducts = modelo.filter(
            product => product.id !== selectedProduct.id
        )
        console.log(selectedProduct.id)
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
            alert("creando modelo")
            const nuevoModelo = {
                id: 0,
                ...formData
            }
            setModelos([...modelos, nuevoModelo])
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
                    />
                </Modal>
            </header>

            <ListaModelo
                modelos={modelos}
                onEdit={manejarEdicionModelo}
                onDelete={manejarEliminarModelo}
            />
            {/* <section className="table-section">
                <h2>Listado</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Talla</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listadoModelos.map((modelo) => (
                            <ListaModelo
                            key={modelo.id_modelo}
                            modelo={modelo}/>
                        ))}
                    </tbody>
                </table>
            </section> */}

        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default App
