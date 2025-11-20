import CalendarComponent from "./Calendar"
import DashboardLayout from "./DashboardLayout"
import QuickAccessCard from "./QuickAccessCard"
import StatCard from "./StatCard"
import { calcAvgLevel } from "../utils/sensorMath";
import { useEffect, useState } from "react";
import type { SensorRecord } from "../utils/sensorData";
import { getActiveSensorsCount, getSensorData, } from "../utils/sensorData";
import { getMaintenancesCount } from "../utils/maintenancesData"





export const AdminDashboard = () => {
    const [_, setSensorData] = useState<SensorRecord[]>([]);
    const [avgLevel, setAvgLevel] = useState<number>(0);
    const [activeSensors, setActiveSensors] = useState<number>(0);
    const [maintenances, setMaintenances] = useState<number>(0);

    useEffect(() => {
        async function fetchData() {
            const data = await getSensorData();
            setSensorData(data);
            const avg = calcAvgLevel(data);
            setAvgLevel(avg);
        }
        fetchData();
    }, []);


    useEffect(() => {
        async function load() {
            const count = await getActiveSensorsCount()
            setActiveSensors(count)
        }
        load();
    }, [])

    useEffect(() => {
        async function load() {
            const count = await getMaintenancesCount()
            setMaintenances(count)
        }
        load();
    }, [])
    return (
        <>
            <DashboardLayout>
                <h1 className="text-white text-3xl font-bold mb-4">Panel de Administración</h1>

                <div className="flex flex-wrap gap-4 mb-6">
                    <StatCard title="Nivel de Llenado Promedio" value={avgLevel} />
                    <StatCard title="Sensores Activos" value={activeSensors} />
                    <StatCard title="Mantenimientos Programados" value={maintenances} />
                </div>

                <h2 className="text-white text-xl font-bold mb-3">Próximos Mantenimientos</h2>

                <div className="flex justify-center mb-6">
                    <CalendarComponent />
                </div>

                <h2 className="text-white text-xl font-bold mb-3">Acceso Rápido</h2>



                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4">
                    <QuickAccessCard icon={<img
                        src="/history-icon.svg"
                        alt="Historial de mantenimientos"
                    />} label="Historial de Sensores" />
                    <QuickAccessCard icon={<img
                        src="/history-icon.svg"
                        alt="Historial de mantenimientos"
                    />} label="Mantenimientos" />
                </div>
            </DashboardLayout>
        </>
    )
}

