import fastapiRequest from "./fastapi";
import {convertir_parametros_get} from "../utils/utils"

export async function getVentasPeriodo(filtros={}) 
{    
    const params = convertir_parametros_get(filtros)
    return fastapiRequest(
        `/dashboard/get_ventas_mes?${params.toString()}`,
        'GET'
    )
}
export async function getActivos() 
{    
    return fastapiRequest(
        `/dashboard/get_activos`,
        'GET'
    )
}
export async function getTallas() 
{    
    return fastapiRequest(
        `/dashboard/get_tallas`,
        'GET'
    )
}