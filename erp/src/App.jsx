import './App.css'
import LoginPage from "./pages/LoginPage"
import Dashboard from "./pages/Dashboard"
import CatalogoModelos from './pages/CatalogoModelos'
import CatalogoColores from './pages/CatalogoColores'
import CatalogoMarcas from './pages/CatalogoMarcas'
import MainLayout from "./layouts/MainLayout"
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom"


function App() {
    const token = localStorage.getItem("token")
    return (
        <Routes>
            <Route element={<MainLayout />}>

            <Route
                path="/login"
                element={<LoginPage />}
            />
            <Route
                path="/catalogo_modelos"
                element={<CatalogoModelos />}
            />
            <Route
                path="/catalogo_colores"
                element={<CatalogoColores />}
            />
            <Route
                path="/catalogo_marcas"
                element={<CatalogoMarcas />}
            />

            <Route
                path="/dashboard"
                element={
                    token
                        ? <Dashboard />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="*"
                element={
                    <Navigate
                        to={
                            token
                                ? "/dashboard"
                                : "/login"
                        }
                    />
                }
            />
            </Route>
        </Routes>
    )

}
// fetch("http://localhost:8007")
//   .then(res => res.json())
//   .then(data => console.log(data))
export default App
