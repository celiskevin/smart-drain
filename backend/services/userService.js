import { where } from "sequelize";
import db from "../models/index.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

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

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  const valid = await comparePassword(password, user.password);
  if (!user || !valid) throw { status: 401, message: "Credenciales Invalidas" };
  const token = generateToken(user);
  return { token };
};
