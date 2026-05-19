import fastapiRequest from "./fastapi";

export async function getTallas() {
    return fastapiRequest("/tallas/get_all_tallas")
}
export async function createTalla(tallaData) {
    return fastapiRequest("/tallas/create_talla", "POST", tallaData)
}
export async function apiUpdateTalla(id, tallaData) {
    return fastapiRequest(`/tallas/actualiza_talla/${id}`, "PATCH", tallaData)
}
export async function apiDeleteTalla(id) {
    return fastapiRequest(`/tallas/borrar_talla/${id}`, "PATCH")
}