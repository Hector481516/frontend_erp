import api from './fastapi'

export async function descargarCatalogoPDF() {

    const response = await api.get(
        '/catalogo/pdf',
        {
            responseType: 'blob'
        }
    )

    return response.data

}
async function generarPDF() {

    try {

        const data =
            await descargarCatalogoPDF()

        const url =
            window.URL.createObjectURL(data)

        const link =
            document.createElement('a')

        link.href = url

        link.download = 'catalogo.pdf'

        link.click()

    } catch (error) {

        console.error(error)

    }

}