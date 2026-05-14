async function fastapiRequest(endpoint, method = "GET", body = null) {
    const FastAPI_URL = "http://localhost:8007"
    const token=localStorage.getItem("token")
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        }
    }
    if (body && method !== "GET") {
        config.body = JSON.stringify(body)
    }
    try
        {const response = await fetch(`${FastAPI_URL}${endpoint}`, config)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        return await response.json()
    } catch (error) {
        console.error("API request failed:", error)
        throw error
    }
}
export default fastapiRequest