import DataTable from "./DataTable";

export default function HistorialIncidencias() {
    const columns = [
        { key: 'id', label: 'ID', width: 'w-[400px]' },
        { key: 'fecha', label: 'Fecha', width: 'w-[400px]' },
        { key: 'descripcion', label: 'Descripción', width: 'w-[400px]' },
        { key: 'prioridad', label: 'Prioridad', width: 'w-60' },
        { key: 'estado', label: 'Estado', width: 'w-60' }
    ];

    const incidencias = [
        {
            id: '#INC-001',
            fecha: '2024-11-15',
            descripcion: 'Obstrucción en alcantarilla principal',
            prioridad: 'Crítico',
            estado: 'En progreso'
        },
        {
            id: '#INC-002',
            fecha: '2024-11-16',
            descripcion: 'Sensor de nivel fuera de servicio',
            prioridad: 'Alto',
            estado: 'Pendiente'
        },
        {
            id: '#INC-003',
            fecha: '2024-11-17',
            descripcion: 'Acumulación de residuos reportada',
            prioridad: 'Medio',
            estado: 'Resuelto'
        },
        {
            id: '#INC-004',
            fecha: '2024-11-18',
            descripcion: 'Fuga detectada en tubería secundaria',
            prioridad: 'Alto',
            estado: 'En progreso'
        },
        {
            id: '#INC-005',
            fecha: '2024-11-19',
            descripcion: 'Revisión rutinaria de sistema',
            prioridad: 'Bajo',
            estado: 'Completado'
        }
    ];

    const handleViewDetails = (id: string) => {
        console.log('Ver detalles de incidencia:', id);
        // navigate(`/incidencias/${id}`);
    };

    return (
        <DataTable
            title="Historial de Incidencias"
            columns={columns}
            data={incidencias}
            onViewDetails={handleViewDetails}
        />
    );
}