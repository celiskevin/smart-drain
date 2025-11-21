import CalendarComponent from "./CalendarComponent"
import DashboardLayout from "./DashboardLayout"
import QuickAccessCard from "./QuickAccessCard"
import StatCard from "./StatCard"
import { calcAvgLevel } from "../utils/sensorMath";
import { useEffect, useState } from "react";
import type { SensorRecord } from "../utils/sensorData";
import { getActiveSensorsCount, getSensorData, } from "../utils/sensorData";
import { getMaintenancesCount } from "../utils/maintenancesData"
import MaintenanceCalendar from "./MaintenanceCalendar";





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

                <h2 className="text-white text-xl font-bold mb-3">Calendario de Mantenimientos</h2>

                <div className="flex justify-center mb-6">
                    <MaintenanceCalendar />
                </div>

                <h2 className="text-white text-xl font-bold mb-3">Acceso Rápido</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                    <QuickAccessCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>}
                        label="Historial de Mantenimientos"
                        to="/historial-mantenimientos"
                    />
                    <QuickAccessCard
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>}
                        label="Agendar Mantenimiento"
                        to="/nuevo-mantenimiento"
                    />
                </div>
            </DashboardLayout>
        </>
    )
}

