import fastapiRequest from "./fastapi";

export function getColores() {
    return fastapiRequest("/colores/get_all_colores")
}
export function createColor(colorData) {
    return fastapiRequest("/colores/create_color", "POST", colorData)
}
export function actualizaColor(id, colorData) {
    return fastapiRequest(`/colores/actualiza_color/${id}`, "PATCH", colorData)
}
export function apiDeleteColor(id) {
    return fastapiRequest(`/colores/borrar_color/${id}`, "PATCH")
}