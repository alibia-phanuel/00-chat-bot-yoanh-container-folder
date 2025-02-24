import express from "express";
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProducts,
} from "../controllers/ProductController";
import { verifyUser } from "../middleware/authUser";
const router = express.Router();
router.get("/products", verifyUser, getProducts);
router.post("/products", verifyUser, createProduct);
router.get("/products/:id", verifyUser, getProductById);
router.patch("/products/:id", verifyUser, updateProduct);
router.delete("/products/:id", verifyUser, deleteProducts);

export default router; // ✅ Exportation par défaut
