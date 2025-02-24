"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
const authUser_1 = require("../middleware/authUser");
const router = express_1.default.Router();
router.get("/users", authUser_1.verifyUser, authUser_1.adminOnly, UsersController_1.getUsers);
router.post("/users", authUser_1.verifyUser, authUser_1.adminOnly, UsersController_1.createUser);
router.get("/users/:id", authUser_1.verifyUser, authUser_1.adminOnly, UsersController_1.getUserById);
router.patch("/users/:id", authUser_1.verifyUser, authUser_1.adminOnly, UsersController_1.updateUser);
router.delete("/users/:id", authUser_1.verifyUser, authUser_1.adminOnly, UsersController_1.deleteUser);
exports.default = router;
