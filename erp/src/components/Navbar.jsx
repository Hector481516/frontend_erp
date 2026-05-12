import "../Navbar.css"
import { Link } from "react-router-dom"

export default function Navbar() {

    return (

        <nav className="navbar">

            {/* LOGO */}

            <div className="navbar-logo">

                <h1>
                    ERP Store
                </h1>

            </div>

            {/* LINKS */}

            <ul className="navbar-links">

                <li>
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/catalogo_modelos">
                        Modelos
                    </Link>
                </li>

                <li>
                    <a href="#">
                        Categorías
                    </a>
                </li>

                <li>
                    <a href="#">
                        Ventas
                    </a>
                </li>

            </ul>

            {/* USER */}

            <div className="navbar-user">

                <button>
                    Cerrar sesión
                </button>

            </div>

        </nav>
    )
}
