import { useEffect, useState } from 'react'
import { getVentasPeriodo, getActivos, getTallas } from '../services/dashboard'
import { obtenerFechaHoy, obtenerRangoMes, formatearFecha} from "../utils/utils"

export function useDashboard() {

    const [ventasMes, setVentasMes] = useState([])
    const [activos, setActivos] = useState([])
    const [tallas, setTallas] = useState([])

    useEffect(() => {
        cargarDatos(),
        cargarActivos(),
        cargarTallas()

    }, [])
    async function cargarDatos() {
        const periodo=obtenerRangoMes(obtenerFechaHoy())
        const response = await getVentasPeriodo({
            fecha_inicio: periodo.fecha_inicio,
            fecha_fin: periodo.fecha_fin
        })
        setVentasMes(response.records)
    }
    async function cargarActivos() {
        const response = await getActivos()
        setActivos(response.records)
    }
    async function cargarTallas() {
        const response = await getTallas()
        setTallas(response.records)
    }
    return {
        ventasMes,
        activos,
        tallas
    }
}