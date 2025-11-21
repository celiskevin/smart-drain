import { useState } from "react";
import SlideBarItem from "./SlideBarItem";
import UserHeader from "./UserHeader";
import { getUser, clearToken } from "../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";

export default function SlideBar() {
    const routesByRole = {
        admin: [
            {
                path: '/dashboard',
                label: 'Dashboard',
                icon: '/dashboard-icon.svg',
                alt: 'Dashboard'
            },
            {
                path: '/historial-incidencias',
                label: 'Historial de Incidencias',
                icon: '/incidence-icon.svg',
                alt: 'Incidencias'
            },
            {
                path: '/nuevo-mantenimiento',
                label: 'Agendar Mantenimiento',
                icon: '/calendar-icon.svg',
                alt: 'Agendar Mantenimiento'
            },
            {
                path: '/historial-mantenimientos',
                label: 'Historial de Mantenimientos',
                icon: '/history-icon.svg',
                alt: 'Historial de mantenimientos'
            },
            {
                path: '/crear-usuarios',
                label: 'Crear Usuarios',
                icon: '/add-user-icon.svg',
                alt: 'Crear Usuario'
            }

        ],
        operario: [
            {
                path: '/dashboard',
                label: 'Dashboard',
                icon: '/dashboard-icon.svg',
                alt: 'Dashboard'
            },
            {
                path: '/historial-incidencias',
                label: 'Historial de Incidencias',
                icon: '/incidence-icon.svg',
                alt: 'Incidencias'
            },
            {
                path: '/historial-mantenimientos',
                label: 'Mis Mantenimientos',
                icon: '/history-icon.svg',
                alt: 'Mis mantenimientos'
            }
        ],
        supervisor: [
            {
                path: '/dashboard',
                label: 'Dashboard',
                icon: '/dashboard-icon.svg',
                alt: 'Dashboard'
            },
            {
                path: '/historial-incidencias',
                label: 'Historial de Incidencias',
                icon: '/incidence-icon.svg',
                alt: 'Incidencias'
            },
            {
                path: '/agendar-mantenimiento',
                label: 'Agendar Mantenimiento',
                icon: '/calendar-icon.svg',
                alt: 'Agendar Mantenimiento'
            },
            {
                path: '/historial-mantenimientos',
                label: 'Historial de Mantenimientos',
                icon: '/history-icon.svg',
                alt: 'Historial de mantenimientos'
            }
        ]
    };


    const [isCollapsed, setIsCollapsed] = useState(false);
    const user = getUser();
    const firstname = user?.firstname;
    const role = user?.role;
    const navigate = useNavigate();
    const location = useLocation();


    const displayName = `${firstname}(${role.toUpperCase()})`;

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const userRoutes = routesByRole[role as keyof typeof routesByRole] || routesByRole.operario;

    const logout = () => {
        clearToken();
        navigate('/login');
    };


    return (
        <div
            className={`flex flex-col p-4 justify-between bg-base transition-all duration-300 ${isCollapsed ? 'w-22' : 'w-80'
                }`}
        >
            <div className="flex flex-col gap-4">
                <button
                    onClick={toggleSidebar}
                    className=" hover:bg-gray-700 rounded-lg transition-color mb-3"
                    aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''
                            }`}
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                {!isCollapsed && (
                    <UserHeader
                        name={displayName}
                        picture="https://lh3.googleusercontent.com/aida-public/AB6AXuCX9aYEJI1YomHoYWT8su1BjZeQkJaSF0e0K4lXHzOoamSrhUHrRe7vYM5JM7tDqw2u8QoMOE_wDQzybUDTHqW4B18lcEKgMdBh4xX3nKuYklmHMBiHTHR9vL4aYNEc8gnjwhrKYkbZX6g7HraQBg7Nrv2E6sXFl7dye6VyJ8Tp25gwR5XznjWUCxMbjGk0nydIi6W5d4fxgFkvjX9dfm1ozfQ8Q80GsLSqOd8zDPPu-L3fLEc7fvYwvCboakf2oLDfzFSX-zN6oiw"
                    />
                )}

                <div className="flex flex-col gap-4 text-white">
                    {userRoutes.map((route) => (
                        <div key={route.path} onClick={() => navigate(route.path)}>
                            <SlideBarItem
                                label={isCollapsed ? "" : route.label}
                                active={location.pathname === route.path}
                                icon={
                                    <img
                                        src={route.icon}
                                        alt={route.alt}
                                        className={`cursor-pointer transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-6 h-6'
                                            }`}
                                    />
                                }
                            />
                        </div>
                    ))}

                    <SlideBarItem
                        label={isCollapsed ? "" : "Cerrar Sesión"}
                        icon={<img src="/logout-icon.svg" alt="Cerrar Sesión" className={`transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-6 h-6'}`} />}
                        onClick={logout} // <--- aquí
                    />
                </div>
            </div>


            <div className="flex flex-col gap-4 justify-end w-full">
                <SlideBarItem
                    label={isCollapsed ? "" : "Ayuda"}
                    icon={
                        <img
                            src="/add-user-icon.svg"
                            alt="Ayuda"
                            className={`transition-all duration-300 ${isCollapsed ? 'w-8 h-8' : 'w-6 h-6'
                                }`}
                        />
                    }
                />
            </div>
        </div>
    );
}