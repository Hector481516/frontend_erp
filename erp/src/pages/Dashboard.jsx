import { useNavigate } from "react-router-dom"

function Dashboard() {

    const navigate = useNavigate()

    function logout() {

        localStorage.removeItem("token")

        navigate("/login")
    }

    return (

        <div>
            <h1>Dashboard</h1>

            <button onClick={logout}>
                Cerrar sesión
            </button>

        </div>
    )
}

export default Dashboard