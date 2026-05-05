import './App.css'
import { useState } from 'react'
import AltaModelo from './components/AltaModelo'

function App() {
    const [modelos, setModelos] = useState({});
    const [auth, setAuth] = useState(true);


    return (
        <div className="container">
            <header className="header">
                <h1>Catálogo de Modelos</h1>
                <button className="btn-primary">+ Nuevo</button>
            </header>
            <AltaModelo />
            <section className="table-section">
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
                        <tr>
                            <td>Tenis Nike</td>
                            <td>Calzado</td>
                            <td>$1200</td>
                            <td>26</td>
                            <td>
                                <button className="btn-edit">Editar</button>
                                <button className="btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

        </div>
    )
}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default App
