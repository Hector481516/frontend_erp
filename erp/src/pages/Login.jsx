import { useState } from "react"
import { useNavigate } from "react-router-dom"

import "../login.css"
function Login({ onLogin }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {

        e.preventDefault()

        setError("")

        setLoading(true)

        try {

            // =========================
            // AQUÍ IRÍA TU API
            // =========================

            console.log(formData)

            // Ejemplo fake login

            if (
                formData.email === "admin@test.com" &&
                formData.password === "123456"
            ) {

                localStorage.setItem(
                    "token",
                    "TOKEN_DE_EJEMPLO"
                )
                navigate("/dashboard")

            } else {

                setError("Correo o contraseña incorrectos")
            }

        } catch (error) {

            setError("Error al iniciar sesión")

        } finally {

            setLoading(false)
        }
    }

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>
                    ERP Store
                </h1>

                <p>
                    Inicia sesión para continuar
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    {
                        error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )
                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Ingresando..."
                                : "Iniciar Sesión"
                        }

                    </button>

                </form>

            </div>

        </div>
    )
}
export default Login