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
        </div>
    )
}

export default Dashboard