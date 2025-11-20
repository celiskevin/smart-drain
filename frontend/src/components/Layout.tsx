import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SlideBar from "./SlideBar";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const location = useLocation();

    // Rutas donde NO queremos mostrar el SlideBar (solo login)
    const publicRoutes = ['/login', '/'];
    const showSlideBar = !publicRoutes.includes(location.pathname);

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow">
                {/* SlideBar a la izquierda (solo en rutas privadas) */}
                {showSlideBar && <SlideBar />}

                {/* Contenedor principal con Header, contenido y Footer */}
                <div className="flex flex-col flex-1">
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}