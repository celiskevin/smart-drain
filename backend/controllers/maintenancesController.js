import db from '../models/index.js';
const { Maintenance } = db;

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

