import fastapiRequest from "./fastapi";

export function getModelos() {
    return fastapiRequest("/modelos")
}
export function createModelo(modeloData) {
    return fastapiRequest("/modelos", "POST", modeloData)
}
export function updateModelo(id, modeloData) {
    return fastapiRequest(`/modelos/${id}`, "PUT", modeloData)
}
export function deleteModelo(id) {
    return fastapiRequest(`/modelos/${id}`, "DELETE")
}