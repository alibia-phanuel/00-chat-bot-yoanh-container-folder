import express from "express";
import { Login, logOut, Me } from "../controllers/AuthController";

const router = express.Router();
/**
 * @route   POST /login
 * @desc    Authentifie l'utilisateur et renvoie un token
 * @access  Public (tout utilisateur peut se connecter)
 */
router.post("/login", Login);
/**
 * @route   GET /me
 * @desc    Récupère les informations de l'utilisateur authentifié
 * @access  Privé (nécessite un token d'authentification)
 */
router.get("/me", Me);
/**
 * @route   DELETE /logout
 * @desc    Déconnecte l'utilisateur en supprimant le token côté serveur
 * @access  Privé (nécessite un token d'authentification)
 */
router.delete("/logout", logOut);
export default router;
