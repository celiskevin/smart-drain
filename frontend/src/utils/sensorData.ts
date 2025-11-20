import axios from "axios";
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