import { useEffect, useState } from 'react'
import { getTallasDisponiblesPorModelo } from '../services/inventario'

export function useInventario() {
    const [inventario, setInventario] = useState([])
    const [tallasPorModelo, setTallasPorModelo] = useState([])
    const [loading, setLoading] = useState(false)
    const getTallasByProductoId = async (productoId) => {
        try {
            const data = await getTallasDisponiblesPorModelo(productoId)
            return data.records
        } catch (error) {
            console.error(error)
            return []
        }
    }
    return {
        getTallasByProductoId
    }
}