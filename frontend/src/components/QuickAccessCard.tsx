interface QuickAccessCardProps {
    icon: React.ReactNode;
    label: string;
}

export default function QuickAccessCard({ icon, label }: QuickAccessCardProps) {
    return (
        <div className="flex items-center gap-3 p-4 border border-[#324d67] bg-[#192633] rounded-lg">
            <div className="text-white">{icon}</div>
            <h2 className="text-white font-bold">{label}</h2>
        </div>
    )
}