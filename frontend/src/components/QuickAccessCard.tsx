import { useNavigate } from 'react-router-dom';

interface QuickAccessCardProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    to?: string;
}

export default function QuickAccessCard({ icon, label, onClick, to }: QuickAccessCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();
        }
    };

    return (
        <div
            className="flex items-center gap-3 p-4 border border-[#324d67] bg-[#192633] rounded-lg cursor-pointer hover:bg-[#233648] transition-colors"
            onClick={handleClick}
        >
            <div className="text-white">{icon}</div>
            <h2 className="text-white font-bold">{label}</h2>
        </div>
    )
}