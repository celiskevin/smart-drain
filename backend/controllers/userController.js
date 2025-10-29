import { createUserService } from "../services/userService.js";
import db from "../models/index.js";
const { User } = db;

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

export const createUser = async (req, res) => {
    try {
        const user = await createUserService(req.body, req.user?.role);
        res.status(201).json({ message: "El usuario se creó correctamente", user });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || "Error interno del servidor"
        });
    }
};