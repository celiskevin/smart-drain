import { type ReactNode } from "react";
import Header from "./Header";

interface LayoutProps{
    children: ReactNode;
}

export default function Layout({children}: LayoutProps){
    return(
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-[#111a22] dark group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
            <Header></Header>
            <main>
                {children}
            </main>
            </div>
        </div>
    )
}