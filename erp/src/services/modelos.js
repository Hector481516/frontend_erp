import fastapiRequest from "./fastapi";

export async function getModelos() {
    return fastapiRequest("/modelos/get_all_modelos")
}
export async function createModelo(modeloData) {
    return fastapiRequest("/modelos/create_modelo", "POST", modeloData)
}
export async function apiUpdateModelo(id, modeloData) {
    return fastapiRequest(`/modelos/actualiza_modelo/${id}`, "PATCH", modeloData)
}
export async function apiDeleteModelo(id) {
    return fastapiRequest(`/modelos/borrar_modelo/${id}`, "PATCH")
}
export async function getClasificacion() {
    return fastapiRequest(`/modelos/get_all_clasificaciones`, "GET")
}