import { useEffect, useState } from 'react'
import { getModelos } from '../services/modelos'

export function useModelos() {
    const [modelos, setModelos] = useState([])
    const [loading, setLoading] = useState(false)
    async function cargarModelos() {
        try {
            setLoading(true)
            const data = await getModelos()
            setModelos(data.records)

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        cargarModelos()
    }, [])
    return {
        modelos,
        loading,
        cargarModelos
    }
}