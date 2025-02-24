"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const router = express_1.default.Router();
/**
 * @route   POST /login
 * @desc    Authentifie l'utilisateur et renvoie un token
 * @access  Public (tout utilisateur peut se connecter)
 */
router.post("/login", AuthController_1.Login);
/**
 * @route   GET /me
 * @desc    Récupère les informations de l'utilisateur authentifié
 * @access  Privé (nécessite un token d'authentification)
 */
router.get("/me", AuthController_1.Me);
/**
 * @route   DELETE /logout
 * @desc    Déconnecte l'utilisateur en supprimant le token côté serveur
 * @access  Privé (nécessite un token d'authentification)
 */
router.delete("/logout", AuthController_1.logOut);
exports.default = router;
