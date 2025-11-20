import { api } from "./api";
import { getToken } from "./auth";

export interface SensorRecord {
    id: number;
    sensor_id: number;
    station_id: number;
    level: number;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    Sensor: {
        id: number;
        name: string;
        status: boolean;
        createdAt: string;
        updatedAt: string;
    };
    Station: {
        id: number;
        name: string;
        status: boolean;
        createdAt: string;
        updatedAt: string;
    };
}


export async function getSensorData(): Promise<SensorRecord[]> {
    try {
        const token = getToken();
        const response = await api.get('/sensor-data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching sensor data:", error);
        return [];
    }

}

export async function getActiveSensorsCount(): Promise<number> {
    try {
        const token = getToken();
        const { data } = await api.get('/sensor-data/active-count', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data.activeSensors;
    } catch (error) {
        console.error("Error fetching active sensors count:", error);
        return 0;
    }
}