import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const generateToken = (userData) => {
  const payload = {
    id: userData.id,
    firstname: userData.firstname,
    lastname: userData.lastname,
    email: userData.email,
    role: userData.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
