import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Dashboard() {

    const navigate = useNavigate()

    function logout() {

        localStorage.removeItem("token")

        navigate("/login")
    }

    return (

        <div>
            <Navbar />
            <h1>Dashboard</h1>

            <button onClick={logout}>
                Cerrar sesión
            </button>

        </div>
    )
}

export default Dashboard