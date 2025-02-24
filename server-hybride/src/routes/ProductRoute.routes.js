"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const authUser_1 = require("../middleware/authUser");
const router = express_1.default.Router();
router.get("/products", authUser_1.verifyUser, ProductController_1.getProducts);
router.post("/products", authUser_1.verifyUser, ProductController_1.createProduct);
router.get("/products/:id", authUser_1.verifyUser, ProductController_1.getProductById);
router.patch("/products/:id", authUser_1.verifyUser, ProductController_1.updateProduct);
router.delete("/products/:id", authUser_1.verifyUser, ProductController_1.deleteProducts);
exports.default = router; // ✅ Exportation par défaut
