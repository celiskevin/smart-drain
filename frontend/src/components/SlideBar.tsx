import SlideBarItem from "./SlideBarItem";
import UserHeader from "./UserHeader";
export default function SlideBar() {
    return (
        <div className="flex flex-col w-80 p-4 justify-between bg-base">
            <div className="flex flex-col gap-4">
                <UserHeader name="Kevin(Admin)" picture="https://lh3.googleusercontent.com/aida-public/AB6AXuCX9aYEJI1YomHoYWT8su1BjZeQkJaSF0e0K4lXHzOoamSrhUHrRe7vYM5JM7tDqw2u8QoMOE_wDQzybUDTHqW4B18lcEKgMdBh4xX3nKuYklmHMBiHTHR9vL4aYNEc8gnjwhrKYkbZX6g7HraQBg7Nrv2E6sXFl7dye6VyJ8Tp25gwR5XznjWUCxMbjGk0nydIi6W5d4fxgFkvjX9dfm1ozfQ8Q80GsLSqOd8zDPPu-L3fLEc7fvYwvCboakf2oLDfzFSX-zN6oiw" />

                <div className="flex flex-col gap-4">
                    <SlideBarItem label="Dashboard" icon={<img
                        src="/dashboard-icon.svg"
                        alt="Dashboard"
                    />}
                    />
                    <SlideBarItem label="Historial de Incidencias" icon={<img
                        src="/incidence-icon.svg"
                        alt="Incidencias"
                    />}
                    />
                    <SlideBarItem label="Agendar Mantenimiento" icon={<img
                        src="/calendar-icon.svg"
                        alt="Agendar Mantenimiento"
                    />}
                    />

                    <SlideBarItem label="Historial de Mantenimientos" icon={<img
                        src="/history-icon.svg"
                        alt="Historial de mantenimientos"
                    />}
                    />

                    <SlideBarItem label="Crear Usuarios" icon={<img
                        src="/add-user-icon.svg"
                        alt="Crear Usuario"
                    />}
                    />
                </div>
            </div>

            {/* //TODO: COLOCAR ABAJO DE LA PANTALLA */}
            {/* <div className="flex flex-col gap-4 justify-end w-full">
                <SlideBarItem label="Ayuda" icon={<img
                    src="/add-user-icon.svg"
                    alt="Crear Usuario"
                />}
                />
            </div> */}
        </div>
    )
}