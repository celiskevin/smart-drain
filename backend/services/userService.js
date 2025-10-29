import db from "../models/index.js";
import { hashPassword } from "../utils/password.js";

const { User } = db;

export const createUserService = async (data, creatorRole) => {
  const { firstname, lastname, email, password, role = "usuario" } = data;
  if (![firstname, lastname, email, password].every(Boolean)) {
    throw { status: 400, message: "Todos los campos son obligatorios" };
  }
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    throw { status: 409, message: "El correo ya está en uso" };
  }
  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    role,
  });
  const { password: _, ...userWithoutPassword } = newUser.toJSON();
  return userWithoutPassword;
};