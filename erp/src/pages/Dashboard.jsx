import GraficaVentas from '../components/dashboard/VentasMes'
import GraficaActivos from '../components/dashboard/Activos'
import GraficaTallas from '../components/dashboard/ResumenTallas'
import { useDashboard } from '../hooks/useDashboard'
import '../styles/dashboard.css?version=8'

function Dashboard() {

    const {
        ventasMes,
        activos,
        tallas
    } = useDashboard()

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <GraficaVentas data={ventasMes} />
                </div>
                <div className="dashboard-card">
                    <GraficaActivos data={activos} />
                </div>
                <div className="dashboard-card">
                    <GraficaTallas data={tallas} />
                </div>
            </div>
        </div>
    )
}
export default Dashboard