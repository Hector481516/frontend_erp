import { useEffect, useState } from 'react'
import { getProductos } from '../services/productos'

export function useProductos() {
    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(false)
    async function cargarProductos(filtros={
            estatus: 1
        }) {
        try {
            setLoading(true)
            const data = await getProductos(filtros)
            setProductos(data.records)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        cargarProductos()
    }, [])
    return {
        productos,
        loading,
        cargarProductos
    }
}