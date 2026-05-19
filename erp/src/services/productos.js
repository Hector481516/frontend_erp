import fastapiRequest from "./fastapi";

export async function getProductos() {
    return fastapiRequest("/productos/get_all_productos")
}
export async function createProducto(productoData) {
    return fastapiRequest("/productos/create_producto", "POST", productoData)
}
export async function apiUpdateProducto(id, productoData) {
    return fastapiRequest(`/productos/actualiza_producto/${id}`, "PATCH", productoData)
}
export async function apiDeleteProducto(id) {
    return fastapiRequest(`/productos/borrar_producto/${id}`, "PATCH")
}