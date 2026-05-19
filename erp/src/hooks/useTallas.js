import { useEffect, useState } from 'react'
import { getTallas } from '../services/tallas'

export function useTallas() {
    const [tallas, setTallas] = useState([])
    const [loading, setLoading] = useState(false)
    async function cargarTallas() {
        try {
            setLoading(true)
            const data = await getTallas()
            setTallas(data.records)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        cargarTallas()
    }, [])
    return {
        tallas,
        loading,
        cargarTallas
    }
}