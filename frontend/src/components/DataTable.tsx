import { useNavigate } from "react-router-dom";

interface Column {
    key: string;
    label: string;
    width?: string;
}

interface TableProps {
    title: string;
    columns: Column[];
    data: any[];
    onViewDetails?: (id: string) => void;
}

export default function DataTable({ title, columns, data, onViewDetails }: TableProps) {
    const navigate = useNavigate();

    const getStatusColor = (status: string) => {
        const statusColors: { [key: string]: string } = {
            'Pendiente': 'bg-[#233648]',
            'En progreso': 'bg-yellow-700',
            'Completado': 'bg-green-700',
            'Resuelto': 'bg-green-700',
            'Crítico': 'bg-red-700',
            'Alto': 'bg-orange-700',
            'Medio': 'bg-yellow-700',
            'Bajo': 'bg-blue-700'
        };
        return statusColors[status] || 'bg-[#233648]';
    };

    return (
        <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                        {title}
                    </p>
                </div>
                <div className="px-4 py-3">
                    <div className="flex overflow-hidden rounded-lg border border-[#324d67] bg-[#111a22]">
                        <table className="flex-1">
                            <thead>
                                <tr className="bg-[#192633]">
                                    {columns.map((column, index) => (
                                        <th
                                            key={column.key}
                                            className={`px-4 py-3 text-left text-white ${column.width || 'w-[400px]'
                                                } text-sm font-medium leading-normal`}
                                        >
                                            {column.label}
                                        </th>
                                    ))}
                                    <th className="px-4 py-3 text-left text-[#92adc9] w-60 text-sm font-medium leading-normal">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-t border-t-[#324d67]">
                                        {columns.map((column) => (
                                            <td
                                                key={column.key}
                                                className={`h-[72px] px-4 py-2 ${column.width || 'w-[400px]'
                                                    } ${column.key === columns[0].key
                                                        ? 'text-white'
                                                        : 'text-[#92adc9]'
                                                    } text-sm font-normal leading-normal`}
                                            >
                                                {column.key === 'estado' || column.key === 'prioridad' ? (
                                                    <button
                                                        className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 ${getStatusColor(
                                                            row[column.key]
                                                        )} text-white text-sm font-medium leading-normal w-full`}
                                                    >
                                                        <span className="truncate">{row[column.key]}</span>
                                                    </button>
                                                ) : (
                                                    row[column.key]
                                                )}
                                            </td>
                                        ))}
                                        <td className="h-[72px] px-4 py-2 w-60">
                                            <button
                                                onClick={() => onViewDetails && onViewDetails(row.id)}
                                                className="text-[#92adc9] hover:text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors"
                                            >
                                                Ver detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}