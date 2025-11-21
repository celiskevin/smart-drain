import React from 'react';
// @ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-ios.css";

moment.locale('es');

const localizer = momentLocalizer(moment);

export interface CalendarEvent {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    status?: string;
    description?: string;
    technician?: string;
    stationName?: string;
}

interface CalendarProps {
    events: CalendarEvent[];
    onSelectEvent?: (event: CalendarEvent) => void;
    onSelectSlot?: (slotInfo: any) => void;
}

export default function CalendarComponent({
    events,
    onSelectEvent,
    onSelectSlot,
}: CalendarProps) {
    const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const eventStyleGetter = (event: CalendarEvent) => {
        let backgroundColor = '#3174ad';

        if (event.status === 'sin resolver') {
            backgroundColor = '#dc2626'; // Rojo
        } else if (event.status === 'en proceso') {
            backgroundColor = '#f59e0b'; // Amarillo/Naranja
        } else if (event.status === 'resuelto') {
            backgroundColor = '#10b981'; // Verde
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '6px',
                opacity: 0.95,
                color: 'white',
                border: 'none',
                display: 'block',
                fontSize: '11px',
                fontWeight: '500',
                padding: '4px 8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease'
            }
        };
    };

    return (
        <div className="rounded-xl shadow-lg w-full max-w-[380px] h-[420px] overflow-hidden" style={{ backgroundColor: '#111a22' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={currentDate}
                onNavigate={handleNavigate}
                onView={() => { }}
                view="month"
                views={["month"]}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                selectable
                popup
                className="ios-calendar"
                eventPropGetter={eventStyleGetter}
                components={{
                    toolbar: (props: any) => (
                        <div className="rbc-toolbar">
                            <span className="rbc-btn-group">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newDate = new Date(currentDate);
                                        newDate.setMonth(newDate.getMonth() - 1);
                                        setCurrentDate(newDate);
                                    }}
                                    className="rbc-btn"
                                >
                                    Anterior
                                </button>
                                <button
                                    type="button"
                                    onClick={handleToday}
                                    className="rbc-btn rbc-btn-today"
                                >
                                    Hoy
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newDate = new Date(currentDate);
                                        newDate.setMonth(newDate.getMonth() + 1);
                                        setCurrentDate(newDate);
                                    }}
                                    className="rbc-btn"
                                >
                                    Siguiente
                                </button>
                            </span>
                            <span className="rbc-toolbar-label">
                                {moment(currentDate).format('MMMM YYYY')}
                            </span>
                        </div>
                    ),
                }}
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    date: "Fecha",
                    time: "Hora",
                    event: "Evento",
                    noEventsInRange: "No hay mantenimientos",
                    showMore: (total: number) => `+${total} más`
                }}
            />
        </div>
    );
}