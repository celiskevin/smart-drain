import db from "../models/index.js";
const { Station } = db;

export const getStations = async (req, res) => {
    try {
        const stations = await Station.findAll();
        res.json(stations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las estaciones" });
    }
};
