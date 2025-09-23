const { User } = require("../models");

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener usuarios" });
    }
};

// Crear un usuario
const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, password, role } = req.body;
        const user = await User.create({ firstname, lastname, email, password, role });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear usuario" });
    }
};

module.exports = { getUsers, createUser };