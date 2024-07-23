export async function getHomePage(): Promise<{ message: string }> {
    const api = import.meta.env.VITE_API_BASE_URL;
    try {
        const response = await fetch(`${api}`)
        const data = await response.json();
        return data
    }catch (error) {
        console.error(error);
        throw error
    }
}
