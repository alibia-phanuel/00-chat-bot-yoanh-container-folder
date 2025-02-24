import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController";
import { verifyUser, adminOnly } from "../middleware/authUser";
const router = express.Router();
router.get("/users", verifyUser, adminOnly, getUsers);
router.post("/users", verifyUser, adminOnly, createUser);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);
export default router;
