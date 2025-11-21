import { createUserService, loginService } from "../services/userService.js";
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
      message: error.message || "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { token } = await loginService(req.body);
    res.status(200).json({ message: "Se inicio sesión correctamente", token });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Error interno del servidor" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "El usuario se eliminó correctamente", user });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Error interno del servidor",
    });
  }
}

export const getTechnicians = async (req, res) => {
  try {
    const technicians = await User.findAll({ where: { role: 'usuario' } });
    res.json(technicians);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener técnicos" });
  }
};