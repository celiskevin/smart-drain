import { useState, useEffect } from "react";
import CalendarComponent, { type CalendarEvent } from "./CalendarComponent";
import { getUpcomingMaintenances } from "../utils/maintenancesData";
import type { Maintenance } from "../utils/maintenancesData";

export default function MaintenanceCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

    useEffect(() => {
        loadMaintenances();
    }, []);

    const loadMaintenances = async () => {
        try {
            setLoading(true);
            console.log('🔄 Cargando mantenimientos...');

            const maintenances = await getUpcomingMaintenances();
            console.log('📊 Mantenimientos obtenidos:', maintenances);
            console.log('📊 Cantidad de mantenimientos:', maintenances.length);

            // Convertir mantenimientos a eventos del calendario
            const calendarEvents: CalendarEvent[] = maintenances.map((maintenance: Maintenance) => {
                const startDate = new Date(maintenance.date);
                const endDate = new Date(maintenance.date);
                endDate.setHours(endDate.getHours() + 2);

                console.log('📅 Procesando mantenimiento:', {
                    id: maintenance.id,
                    date: maintenance.date,
                    parsedDate: startDate,
                    status: maintenance.status,
                    type: maintenance.type
                });

                return {
                    id: maintenance.id,
                    title: `${maintenance.type} - ${maintenance.station?.name || 'Estación'}`,
                    start: startDate,
                    end: endDate,
                    status: maintenance.status,
                    description: maintenance.description,
                    technician: maintenance.technician?.firstname,
                    stationName: maintenance.station?.name
                };
            });

            console.log('✅ Eventos del calendario creados:', calendarEvents);
            setEvents(calendarEvents);
            setError(null);
        } catch (err) {
            console.error('❌ Error loading maintenances:', err);
            setError('Error al cargar los mantenimientos');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectEvent = (event: CalendarEvent) => {
        console.log('🖱️ Evento seleccionado:', event);
        setSelectedEvent(event);
    };

    const handleSelectSlot = (slotInfo: any) => {
        console.log('📆 Fecha seleccionada para nuevo mantenimiento:', slotInfo.start);
    };

    const getStatusLabel = (status: string) => {
        const statusMap: { [key: string]: string } = {
            'sin resolver': 'Sin Resolver',
            'en proceso': 'En Proceso',
            'resuelto': 'Resuelto'
        };
        return statusMap[status] || status;
    };

    if (loading) {
        return (
            <div className="rounded-xl bg-card p-3 shadow-lg w-full max-w-[380px] h-[420px] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <p className="text-white">Cargando calendario...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-card p-3 shadow-lg w-full max-w-[380px] h-[420px] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-3">{error}</p>
                    <button
                        onClick={loadMaintenances}
                        className="px-4 py-2 bg-[#233648] text-white rounded-lg hover:bg-[#324d67] transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-bold">
                    Mantenimientos Próximos ({events.length})
                </h2>
                <button
                    onClick={loadMaintenances}
                    className="text-[#92adc9] hover:text-white text-sm transition-colors"
                >
                    Actualizar
                </button>
            </div>

            <CalendarComponent
                events={events}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
            />

            {/* Mostrar mensaje si no hay eventos */}
            {events.length === 0 && (
                <div className="rounded-xl bg-[#192633] p-4 w-full max-w-[380px] border border-[#324d67]">
                    <p className="text-[#92adc9] text-center">
                        No hay mantenimientos próximos programados
                    </p>
                </div>
            )}

            {/* Modal de detalles del evento seleccionado */}
            {selectedEvent && (
                <div className="rounded-xl bg-[#192633] p-4 shadow-lg w-full max-w-[380px] border border-[#324d67]">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-white font-bold text-lg">{selectedEvent.title}</h3>
                        <button
                            onClick={() => setSelectedEvent(null)}
                            className="text-[#92adc9] hover:text-white transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <p className="text-[#92adc9] text-sm">
                            <span className="font-semibold text-white">Descripción:</span> {selectedEvent.description}
                        </p>

                        {selectedEvent.technician && (
                            <p className="text-[#92adc9] text-sm">
                                <span className="font-semibold text-white">Técnico:</span> {selectedEvent.technician}
                            </p>
                        )}

                        {selectedEvent.stationName && (
                            <p className="text-[#92adc9] text-sm">
                                <span className="font-semibold text-white">Estación:</span> {selectedEvent.stationName}
                            </p>
                        )}

                        <p className="text-[#92adc9] text-sm">
                            <span className="font-semibold text-white">Estado:</span>{' '}
                            <span className={`inline-block px-2 py-1 rounded text-xs ${selectedEvent.status === 'resuelto' ? 'bg-green-700' :
                                selectedEvent.status === 'en proceso' ? 'bg-yellow-700' :
                                    'bg-red-700'
                                }`}>
                                {getStatusLabel(selectedEvent.status || '')}
                            </span>
                        </p>

                        <p className="text-[#92adc9] text-sm">
                            <span className="font-semibold text-white">Fecha:</span>{' '}
                            {selectedEvent.start.toLocaleDateString('es-ES', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
            )}

            {/* Leyenda de colores */}
            <div className="rounded-xl bg-[#192633] p-3 w-full max-w-[380px] border border-[#324d67]">
                <p className="text-white text-sm font-semibold mb-2">Estados:</p>
                <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-700"></div>
                        <span className="text-[#92adc9] text-xs">Sin Resolver</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-700"></div>
                        <span className="text-[#92adc9] text-xs">En Proceso</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-700"></div>
                        <span className="text-[#92adc9] text-xs">Resuelto</span>
                    </div>
                </div>
            </div>
        </div>
    );
}