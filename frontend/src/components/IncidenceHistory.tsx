import { useState, useEffect } from "react";
import DataTable from "./DataTable";
import { getSensorData } from "../utils/sensorData";

export default function HistorialSensores() {
    const [sensorData, setSensorData] = useState<any[]>([]);

    const columns = [
        { key: 'id', label: 'ID', width: 'w-[200px]' },
        { key: 'fecha', label: 'Fecha', width: 'w-[200px]' },
        { key: 'sensor', label: 'Sensor', width: 'w-[300px]' },
        { key: 'estacion', label: 'Estación', width: 'w-[300px]' },
        { key: 'nivel', label: 'Nivel', width: 'w-60' },
        { key: 'estado', label: 'Estado', width: 'w-60' }
    ];

    const getStatus = (level: number) => {
        return level > 15 ? "MANTENIMIENTO" : "NORMAL";
    };

    useEffect(() => {
        async function loadData() {
            const data = await getSensorData();

            const mapped = data.map((d: any) => ({
                id: `#${String(d.id).padStart(6, '0')}`,
                fecha: new Date(d.createdAt).toLocaleDateString(),
                sensor: d.Sensor?.name ?? "N/A",
                estacion: d.Station?.name ?? "N/A",
                nivel: `${d.level.toFixed(1)}`,
                estado: getStatus(d.level)
            }));

            setSensorData(mapped);
        }

        loadData();
    }, []);

    const handleViewDetails = (id: string) => {
        console.log("Ver detalles del sensor:", id);
        // navigate(`/sensores/${id}`);
    };

    return (
        <DataTable
            title="Historial de Incidencias"
            columns={columns}
            data={sensorData}
            onViewDetails={handleViewDetails}
        />
    );
}
