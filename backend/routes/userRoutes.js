import { Router } from "express";
import { getUsers, createUser, login, deleteUser } from "../controllers/userController.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/login", login);
router.delete("/:id", deleteUser);
export default router;
