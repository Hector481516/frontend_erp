import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"

function MainLayout() {

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