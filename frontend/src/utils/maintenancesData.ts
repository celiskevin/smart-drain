import { api } from "./api";
import { getToken } from "./auth";

export interface MaintenanceData {
    date: string;
    type: string;
    station_id: number;
    technician_id: number;
    description: string;
    assigned_by: number;
}

export interface Maintenance {
    id: number;
    date: string;
    type: string;
    description: string;
    status: 'sin resolver' | 'en proceso' | 'resuelto';
    assigned_by: number;
    technician_id: number;
    station_id: number;
    assignedBy?: {
        id: number;
        firstname: string;
    };
    technician?: {
        id: number;
        firstname: string;
    };
    station?: {
        id: number;
        name: string;
    };
    created_at?: string;
    updated_at?: string;
}

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

export async function getMaintenancesData(): Promise<Maintenance[]> {
    try {
        const token = getToken();
        console.log('🔑 Token:', token ? 'Existe' : 'No existe');

        const response = await api.get('/maintenances', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log('📡 Respuesta completa del backend:', response);
        console.log('📊 Data recibida:', response.data);

        return response.data;
    } catch (error: any) {
        console.error("❌ Error fetching maintenances data:", error);
        console.error("❌ Error response:", error.response);
        console.error("❌ Error message:", error.message);
        return [];
    }
}

export async function getAllMaintenances(): Promise<Maintenance[]> {
    try {
        const maintenances = await getMaintenancesData();
        console.log('📋 Todos los mantenimientos:', maintenances);

        const sorted = maintenances.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        console.log('✅ Mantenimientos ordenados:', sorted);
        return sorted;
    } catch (error) {
        console.error('❌ Error fetching all maintenances:', error);
        return [];
    }
}

export async function getUpcomingMaintenances(): Promise<Maintenance[]> {
    try {
        const maintenances = await getMaintenancesData();
        console.log('📋 Todos los mantenimientos recibidos:', maintenances);

        const filtered = maintenances.filter(m => m.status !== 'resuelto');
        console.log('✅ Mantenimientos no resueltos:', filtered);

        const sorted = filtered.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        return sorted;
    } catch (error) {
        console.error('❌ Error fetching upcoming maintenances:', error);
        return [];
    }
}

export async function createMaintenance(maintenanceData: MaintenanceData): Promise<Maintenance | null> {
    try {
        const token = getToken();
        const { data } = await api.post('/maintenances', maintenanceData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.error('Error creating maintenance:', error);
        throw error;
    }
}

export async function updateMaintenanceStatus(
    id: number,
    status: 'sin resolver' | 'en proceso' | 'resuelto'
): Promise<Maintenance | null> {
    try {
        const token = getToken();
        const { data } = await api.patch(`/maintenances/${id}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return data.maintenance;
    } catch (error) {
        console.error('Error updating maintenance status:', error);
        throw error;
    }
}