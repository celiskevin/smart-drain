import db from "../models/index";
import { hashPassword } from "../utils/password";

const { User } = db;

export const createUserService = async (data, creatorRole) => {
  //   if (creatorRole !== "admin")
  //     throw { status: 403, message: "Acceso Denegado" };
  const { firstname, lastname, email, password, role = "usuario" } = data;
  if (![firstname, lastname, email, password].every(Boolean)) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw { status: 409, message: "El correo ya está en uso" };
  }
  const hashedPassword = await hashPassword(password);
  const newUser = User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
  });
  const { password: _, ...userWithoutPassword } = newUser.toJSON();
  return userWithoutPassword;
};

// const createUser = async (req, res) => {
//     try {
//         const { firstname, lastname, email, password, role } = req.body;
//         const user = await User.create({ firstname, lastname, email, password, role });
//         res.status(201).json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Error al crear usuario" });
//     }
// };
