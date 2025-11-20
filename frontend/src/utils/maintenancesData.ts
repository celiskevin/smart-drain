import { api } from "./api";
import { getToken } from "./auth";


export async function getMaintenancesCount() {
    try {
        const token = getToken();
        const { data } = await api.get('/maintenances/count', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.maintenancesCount;
    } catch (error) {
        console.error("Error fetching maintenances count:", error);
        return 0;
    }
}