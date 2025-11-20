import CalendarComponent from "./Calendar"
import DashboardLayout from "./DashboardLayout"
import QuickAccessCard from "./QuickAccessCard"
import StatCard from "./StatCard"
export const AdminDashboard = () => {
    return (
        <>
            <DashboardLayout>
                <h1 className="text-white text-3xl font-bold mb-4">Panel de Administración</h1>

                <div className="flex flex-wrap gap-4 mb-6">
                    <StatCard title="Nivel de Llenado Promedio" value="65%" />
                    <StatCard title="Sensores Activos" value="120" />
                    <StatCard title="Mantenimientos Programados" value="15" />
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

