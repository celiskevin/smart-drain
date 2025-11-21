import { useState, useEffect } from "react";
import { getStations } from "../utils/stationData";
import { getTechnicians, createMaintenance } from "../utils/userData";
import { getUser } from "../utils/auth";


export default function MaintenanceForm() {
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [station, setStation] = useState("");
    const [technician, setTechnician] = useState("");
    const [description, setDescription] = useState("");
    const [stations, setStations] = useState<{ id: number; name: string }[]>([]);
    const [technicians, setTechnicians] = useState<{ id: number; firstname: string }[]>([]);

    useEffect(() => {
        const fetchStations = async () => {
            const data = await getStations();
            setStations(data);
        };
        fetchStations();
    }, []);

    useEffect(() => {
        const fetchTechnicians = async () => {
            const data = await getTechnicians();
            setTechnicians(data);
        };
        fetchTechnicians();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!date || !type || !station || !technician || !description) {
            alert("Todos los campos son obligatorios");
            return;
        }

        try {
            const user = getUser();
            if (!user) throw new Error("Usuario no autenticado");
            const newMaintenance = await createMaintenance({
                date,
                type,
                station_id: Number(station),
                technician_id: Number(technician),
                description,
                assigned_by: user.id,

            });
            console.log("Mantenimiento creado:", newMaintenance);
            setDate("");
            setType("");
            setStation("");
            setTechnician("");
            setDescription("");
            alert("Mantenimiento creado con éxito!");
        } catch (error) {
            console.error("Error al crear el mantenimiento:", error);
            alert("Error al crear el mantenimiento");
        }
    };

    return (
        <div className="flex-1 p-6 lg:p-10">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        Nuevo Registro de Mantenimiento
                    </h1>
                    <p className="text-[#92adc9] text-base font-normal leading-normal mt-2">
                        Complete los siguientes campos para agendar una nueva tarea.
                    </p>
                </div>

                <div className="bg-[#111a22] border border-[#324d67]/30 rounded-xl p-6 lg:p-8">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                        <div className="md:col-span-1">
                            <label className="flex flex-col w-full">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Fecha de Mantenimiento
                                </p>
                                <div className="flex w-full flex-1 items-stretch rounded-lg">
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        placeholder="Seleccionar fecha"
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                                    />
                                    <div className="text-[#92adc9] flex border border-[#324d67] bg-[#192633] items-center justify-center pr-[15px] rounded-r-lg border-l-0">
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className="md:col-span-1">
                            <label className="flex flex-col w-full">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Tipo de Mantenimiento
                                </p>
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal appearance-none bg-no-repeat bg-right"
                                >
                                    <option value="" disabled>
                                        Seleccionar tipo...
                                    </option>
                                    <option value="preventivo">Preventivo</option>
                                    <option value="correctivo">Correctivo</option>
                                    <option value="inspeccion">Inspección</option>
                                </select>
                            </label>
                        </div>

                        <div className="md:col-span-1">
                            <label className="flex flex-col w-full">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Estación / Alcantarilla
                                </p>
                                <select
                                    value={station}
                                    onChange={(e) => setStation(e.target.value)}
                                    className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal appearance-none bg-no-repeat bg-right"
                                >
                                    <option value="" disabled>
                                        Seleccionar estación...
                                    </option>
                                    {stations.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="md:col-span-1">
                            <label className="flex flex-col w-full">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Técnico Asignado
                                </p>
                                <select
                                    value={technician}
                                    onChange={(e) => setTechnician(e.target.value)}
                                    className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-primary h-14 placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal appearance-none bg-no-repeat bg-right"
                                >
                                    <option value="" disabled>
                                        Asignar técnico...
                                    </option>
                                    {technicians.map((t) => (
                                        <option key={t.id} value={t.id}>
                                            {t.firstname}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="md:col-span-2">
                            <label className="flex flex-col w-full">
                                <p className="text-white text-base font-medium leading-normal pb-2">
                                    Descripción Detallada
                                </p>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Añada una descripción detallada de la tarea a realizar..."
                                    rows={5}
                                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#324d67] bg-[#192633] focus:border-primary placeholder:text-[#92adc9] p-[15px] text-base font-normal leading-normal"
                                />
                            </label>
                        </div>

                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                className="px-6 py-3 rounded-lg text-white font-medium text-base bg-transparent hover:bg-[#233648]/60 border border-transparent cursor-pointer"
                                onClick={() => {
                                    setDate("");
                                    setType("");
                                    setStation("");
                                    setTechnician("");
                                    setDescription("");
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-lg text-white font-medium text-base bg-[#1e90ff] hover:bg-[#1e90ff]/90 focus:outline-none focus:ring-2 focus:ring-[#1e90ff]/50 focus:ring-offset-2 focus:ring-offset-[#1e90ff] flex items-center gap-2 cursor-pointer"
                            >
                                Guardar Mantenimiento
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
