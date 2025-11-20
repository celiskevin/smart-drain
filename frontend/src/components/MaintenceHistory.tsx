import DataTable from "./DataTable";

export default function HistorialMantenimientos() {
    const columns = [
        { key: 'id', label: 'ID', width: 'w-[400px]' },
        { key: 'fecha', label: 'Fecha', width: 'w-[400px]' },
        { key: 'ubicacion', label: 'Ubicación', width: 'w-[400px]' },
        { key: 'estado', label: 'Estado', width: 'w-60' }
    ];

    const mantenimientos = [
        {
            id: '#2024001',
            fecha: '2024-07-20',
            ubicacion: 'Calle Principal #123, Ciudad A',
            estado: 'Pendiente'
        },
        {
            id: '#2024002',
            fecha: '2024-07-22',
            ubicacion: 'Avenida Central #456, Ciudad B',
            estado: 'En progreso'
        },
        {
            id: '#2024003',
            fecha: '2024-07-25',
            ubicacion: 'Calle Secundaria #789, Ciudad C',
            estado: 'Completado'
        },
        {
            id: '#2024004',
            fecha: '2024-07-28',
            ubicacion: 'Avenida Norte #101, Ciudad D',
            estado: 'Pendiente'
        },
        {
            id: '#2024005',
            fecha: '2024-07-30',
            ubicacion: 'Calle Sur #202, Ciudad E',
            estado: 'En progreso'
        }
    ];

    const handleViewDetails = (id: string) => {
        console.log('Ver detalles de:', id);
        // Aquí puedes navegar a la página de detalles
        // navigate(`/mantenimientos/${id}`);
    };

    return (
        <DataTable
            title="Mantenimientos Asignados"
            columns={columns}
            data={mantenimientos}
            onViewDetails={handleViewDetails}
        />
    );
}