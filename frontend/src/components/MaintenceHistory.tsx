import DataTable from "./DataTable";
import { useState, useEffect } from "react";
import { getMaintenancesData } from "../utils/maintenancesData";
import { api } from "../utils/api";
import StatusModal from "./shared/StatusModal";

export default function HistorialMantenimientos() {

    const [maintenances, setMaintenances] = useState([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    function capitalizeWords(str: string) {
        return str
            .toLowerCase()
            .split(" ")
            .filter(Boolean)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    const columns = [
        { key: 'id', label: 'ID', width: 'w-[400px]' },
        { key: 'fecha', label: 'Fecha', width: 'w-[400px]' },
        { key: 'descripcion', label: 'Descripción', width: 'w-[400px]' },
        { key: 'asignado', label: 'Asignado Por', width: 'w-60' },
        { key: 'tecnico', label: 'Tecnico Responsable', width: 'w-60' },
        { key: 'estacion', label: 'Estacion', width: 'w-60' },
        { key: 'estado', label: 'Estado', width: 'w-60' },

    ];

    useEffect(() => {
        loadData();
    }, []);
    async function loadData() {
        const data = await getMaintenancesData();

        const mapped = data.map((m: any) => ({
            id: `#${String(m.id).padStart(6, '0')}`,
            fecha: m.date?.split('T')[0],
            descripcion: m.description,
            asignado: m.assignedBy ? capitalizeWords(m.assignedBy.firstname) : "N/A",
            tecnico: m.technician ? capitalizeWords(m.technician.firstname) : "N/A",
            estacion: m.station ? capitalizeWords(m.station.name) : "N/A",
            estado: m.status.toUpperCase(),
        }));

        setMaintenances(mapped);
    }


    async function updateStatus(id: number, newStatus: string) {
        const token = localStorage.getItem("token");

        await api.put(
            `/maintenances/${id}/status`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        await loadData(); // refresca tabla
    }


    const handleViewDetails = (id: string) => {
        setSelectedId(Number(id.replace("#", "")));
        setShowStatusModal(true); // ← aquí abrirás tu modal
    };

    return (
        <>
            <DataTable
                title="Mantenimientos Asignados"
                columns={columns}
                data={maintenances}
                onViewDetails={handleViewDetails}
            />

            <StatusModal
                open={showStatusModal}
                onClose={() => setShowStatusModal(false)}
                currentStatus={selectedStatus}
                onChangeStatus={async (newStatus) => {
                    if (selectedId) {
                        await updateStatus(selectedId, newStatus);
                    }
                    setShowStatusModal(false);
                }}
            />
        </>
    );
}