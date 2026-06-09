function toggleModal(modalId, btnId) {
    var modal = document.getElementById(modalId);
    var btn = document.getElementById(btnId);
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
function convertir_parametros_get(filtros){
    const params = new URLSearchParams()
    Object.entries(filtros).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.append(key, value)
        }
    })
    return params
}
function obtenerFechaHoy() {
    return new Date().toISOString().split('T')[0]
}
function formatearFecha(fecha = new Date()) 
{
    return fecha.toISOString().split('T')[0]
}
function obtenerRangoMes(fecha = new Date()) {

    const fechaObj = new Date(fecha)

    const inicio = new Date(
        fechaObj.getFullYear(),
        fechaObj.getMonth(),
        1
    )

    const fin = new Date(
        fechaObj.getFullYear(),
        fechaObj.getMonth() + 1,
        0
    )

    return {
        fecha_inicio: formatearFecha(inicio),
        fecha_fin: formatearFecha(fin)
    }
}
export {toggleModal, convertir_parametros_get, obtenerFechaHoy, formatearFecha, obtenerRangoMes}