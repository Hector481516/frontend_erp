import fastapiRequest from "./fastapi";

export function getMarcas() {
    return fastapiRequest("/marcas/get_all_marcas")
}
export function createMarca(marcaData) {
    return fastapiRequest("/marcas/create_marca", "POST", marcaData)
}
export function actualizaMarca(id, marcaData) {
    return fastapiRequest(`/marcas/actualiza_marca/${id}`, "PATCH", marcaData)
}
export function apiDeleteMarca(id) {
    return fastapiRequest(`/marcas/borrar_marca/${id}`, "PATCH")
}