import '../App.css'
import { useState, useEffect } from 'react'
import AltaEdicionColor from '../components/AltaEdicionColor'
import Modal from '../components/Modal'
import ListaColor from '../components/ListaColores'
import {toggleModal} from '../utils/utils'
import { getColores, createColor, actualizaColor, apiDeleteColor } from '../services/colores'
const token = localStorage.getItem("token")

function CatalogoColores() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //Estados colores
    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [colores, setColores] = useState([]);
    const [listadoColores, setListadoColores] = useState(colores);
    useEffect(() => {
        cargarColores();
    }, []);
    //Estado modal
    const [modalType, setModalType] = useState("create")
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useState();
    async function cargarColores() {
        try {
            const data = await getColores()
            setColores(data.records)
        } catch (error) {
            console.error("Error al cargar colores:", error)
        }
    }
    function manejarEdicionColor(color) {
        setColorSeleccionado(color)
        setModalType("edit")
        setIsOpen(true)
    }
    function manejarCrearColor() {
        setIsOpen(true)
        setColorSeleccionado(null)
        setModalType("create")
    }
    function manejarEliminarColor(color) {
        setIsOpen(true)
        setColorSeleccionado(color)
        setModalType("delete")
    }
    function confirmDelete(deleteColor) {

        const filteredColors = colores.filter(
            color => color.id_color !== deleteColor.id_color
        )
        apiDeleteColor(deleteColor.id_color)
        setColores(filteredColors)
        setIsOpen(false)
        cargarColores()
    }
    function updateColor(updatedColor) {
        const updatedColores = colores.map(color => {
            if (color.id_color === updatedColor.id_color) {
                actualizaColor(updatedColor.id_color, updatedColor)
                return updatedColor
            }
            return color
        })

        setColores(updatedColores)
    }
    function onSubmit(formData) {
        if (modalType === "edit") {
            updateColor(formData)
            cargarColores()
        } else {
            createColor(formData).then(nuevoColor => {
                // setColores([...colores, nuevoColor])
                cargarColores()
            })
        }
        setIsOpen(false)
    }
    return (
        <div className="container">
            <header className="header">
                <h1>Catálogo de Colores</h1>
                <button className='btn-primary' onClick={() => manejarCrearColor()}>
                    + Nuevo
                </button>
                <Modal
                    size="modal-sm"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                    title=
                    {
                        modalType === "edit"
                            ? "Editar Color"
                            : modalType === "delete"
                                ? "Eliminar Color"
                                : "Nuevo Color"
                    }
                >
                    <AltaEdicionColor
                        key={colorSeleccionado?.id_color}
                        mode={modalType}
                        color={colorSeleccionado}
                        onSubmit={onSubmit}
                        confirmDelete={confirmDelete}
                    />
                </Modal>
            </header>

            <ListaColor
                colores={colores}
                onEdit={manejarEdicionColor}
                onDelete={manejarEliminarColor}
            />
        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default CatalogoColores
