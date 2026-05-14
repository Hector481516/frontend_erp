import fastapiRequest from "./fastapi";

export function getModelos() {
    return fastapiRequest("/modelos/get_all_modelos")
}
export function createModelo(modeloData) {
    return fastapiRequest("/modelos/create_modelo", "POST", modeloData)
}
export function updateModelo(id, modeloData) {
    return fastapiRequest(`/modelos/actualiza_modelo/${id}`, "PATCH", modeloData)
}
export function deleteModelo(id) {
    return fastapiRequest(`/modelos/${id}`, "PATCH")
}
export function getClasificacion() {
    return fastapiRequest(`/modelos/get_all_clasificaciones`, "GET")
}