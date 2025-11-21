import db from '../models/index.js';
const { Maintenance, Station, User } = db;

export const createMaintenance = async (req, res) => {
    try {
        const { date, type, description, assigned_by, technician_id, station_id } = req.body;

        if (!date || !type || !description || !assigned_by || !technician_id || !station_id) {
            return res.status(400).json({
                error: "Todos los campos son obligatorios"
            })
        }

        const data = await Maintenance.create({
            date,
            type,
            description,
            assigned_by,
            technician_id,
            station_id
        });

        res.status(201).json(data);
    } catch (error) {
        console.error("Error creating maintenance:", error);
        res.status(500).json({
            error: "Error creating maintenance",
            details: error.message
        });
    }
}

export const getMaintenancesCount = async (req, res) => {
    try {
        const count = await Maintenance.count();

        res.json({ maintenancesCount: count })
    } catch (error) {
        console.error('Error getting maintenances count:', error);
        res.status(500).json({
            error: "Error getting maintenances count",
            details: error.message
        })
    }
}

export const getMaintenanceData = async (req, res) => {
    try {
        const data = await Maintenance.findAll({
            include: [
                {
                    model: User,
                    as: "assignedBy",
                    attributes: ["id", "firstname"]
                },
                {
                    model: User,
                    as: "technician",
                    attributes: ["id", "firstname"]
                },
                {
                    model: Station,
                    as: "station",
                    attributes: ["id", "name"]
                }
            ]
        });

        res.json(data);
    } catch (error) {
        console.error("Error getting maintenances data:", error);
        res.status(500).json({
            error: "Error getting maintenances data",
            details: error.message
        });
    }
};


export const updateMaintenanceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const valid = ["sin resolver", "en proceso", "resuelto"];
        if (!valid.includes(status)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        const maintenance = await Maintenance.findByPk(id);
        if (!maintenance) {
            return res.status(404).json({ error: "Maintenance not found" });
        }

        maintenance.status = status;
        await maintenance.save();

        res.json({ message: "Status actualizado", maintenance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUpcomingMaintenances = async () => {
    try {
        const maintenances = await getMaintenances();
        const now = new Date();

        // Filtrar solo mantenimientos futuros que no estén resueltos
        return maintenances.filter(m => {
            const maintenanceDate = new Date(m.date);
            return maintenanceDate >= now && m.status !== 'resuelto';
        });
    } catch (error) {
        console.error('Error fetching upcoming maintenances:', error);
        throw error;
    }
};