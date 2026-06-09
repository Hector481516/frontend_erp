import { useEffect, useState } from 'react'
import { getModelos } from '../services/modelos'

export function useModelos(filtros={}) {
    const [modelos, setModelos] = useState([])
    const [loading, setLoading] = useState(false)
    async function cargarModelos() {
        try {
            setLoading(true)
            const data = await getModelos(filtros)
            setModelos(data.records || [])

        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        cargarModelos()
    }, [JSON.stringify(filtros)])
    return {
        modelos,
        loading,
        cargarModelos
    }
}