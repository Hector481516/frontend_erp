import fastapiRequest from "./fastapi";

export async function getProductos(filtros={}) {
    const params = new URLSearchParams()
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.append(key, value)
        }
    })
    return fastapiRequest(`/productos/get_all_productos?${params.toString()}`, "GET")
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
export async function apiMarcarVenta(id, producto) {
    return fastapiRequest(`/productos/marcar_venta/${id}`, "PATCH", producto)
}