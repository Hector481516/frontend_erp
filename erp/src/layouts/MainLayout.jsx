import { Outlet,useLocation  } from "react-router-dom"

import Navbar from "../components/Navbar"

function MainLayout() {
    const location = useLocation()

    const ocultarNavbar =
        location.pathname === '/catalogoPDF'

    return (

        <>

            {!ocultarNavbar && <Navbar />}

            <Outlet />

        </>

    )
    return (

        <div>

            <Navbar />

            <main className="main-content">

                <Outlet />

            </main>

        </div>
    )
}

export default MainLayout