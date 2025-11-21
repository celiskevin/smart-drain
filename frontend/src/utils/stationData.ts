import { api } from "./api";
import { getToken } from "./auth";


export async function getStations() {
    try {
        const token = getToken();
        const response = await api.get('/stations', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching stations:", error);
        return [];
    }
}
