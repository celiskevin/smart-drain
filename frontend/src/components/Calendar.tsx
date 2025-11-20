// @ts-ignore
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar-ios.css"; // estilos custom

const localizer = momentLocalizer(moment);

interface Event {
    title: string;
    start: Date;
    end: Date;
}

interface CalendarProps {
    events: Event[];
    onSelectEvent?: (event: Event) => void;
    onSelectSlot?: (slotInfo: any) => void;
}

export default function CalendarComponent({
    events,
    onSelectEvent,
    onSelectSlot,
}: CalendarProps) {
    return (
        <div className="rounded-xl bg-card  p-3 shadow-lg w-full max-w-[380px] h-[420px]">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                views={["month"]}
                onSelectEvent={onSelectEvent}
                onSelectSlot={onSelectSlot}
                popup
                className="ios-calendar"
            />
        </div>
    );
}
