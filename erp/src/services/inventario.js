import fastapiRequest from "./fastapi";

export async function getInventarioDisponible(filtros={}) {
    console.log("Aqui ando")
        return fastapiRequest("/inventario/get_all_inventario", "GET", { params: filtros })
    }
export async function getTallasDisponiblesPorModelo(id_modelo_detalle) {
    return fastapiRequest(`/tallas/get_tallas_disponibles_by_modelo/${id_modelo_detalle}`, "GET")
}