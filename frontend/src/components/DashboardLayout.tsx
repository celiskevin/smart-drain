import SlideBar from "./SlideBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-[#111a22] min-h-screen">
            <main className="flex-1 p-4">{children}</main>

        </div>
    );
}