import { api } from "./api";
import { getToken } from "./auth";

interface MaintenanceData {
    date: string;
    type: string;
    station_id: number;
    technician_id: number;
    description: string;
    assigned_by: number;
}
export const getTechnicians = async () => {
    try {
        const token = getToken();
        const response = await api.get('/users/technicians', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching technicians:", error);
        return [];
    }
}

export async function createMaintenance(data: MaintenanceData) {
    try {
        const token = getToken();
        const response = await api.post('/maintenances', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating maintenance:", error);
        return null;
    }
}