"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.Me = exports.Login = void 0;
const User_1 = __importDefault(require("../models/User"));
require("express-session");
const argon2_1 = __importDefault(require("argon2"));
const Login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }
        const match = yield argon2_1.default.verify(user.password, req.body.password);
        if (!match) {
            return res.status(400).json({ msg: "Mot de passe erroné" });
        }
        req.session.userId = user.uuid;
        const uuid = user === null || user === void 0 ? void 0 : user.uuid;
        const name = user === null || user === void 0 ? void 0 : user.name;
        const email = user === null || user === void 0 ? void 0 : user.email;
        const role = user === null || user === void 0 ? void 0 : user.role;
        res.status(200).json({ uuid, name, email, role });
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.Login = Login;
/**
 * Fonction de récupération des informations de l'utilisateur connecté.
 */
const Me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifie si l'utilisateur est authentifié via la session
        if (!req.session.userId) {
            res.status(401).json({ msg: "Utilisateur non authentifié" });
            return;
        }
        // Recherche de l'utilisateur correspondant à l'ID stocké en session
        const user = yield User_1.default.findOne({
            attributes: ["uuid", "name", "email", "role"],
            where: {
                uuid: req.session.userId,
            },
        });
        // Vérifie si l'utilisateur existe
        if (!user) {
            res.status(404).json({ msg: "Utilisateur non trouvé" });
            return;
        }
        // Retourne les informations de l'utilisateur
        res.status(200).json(user);
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.Me = Me;
/**
 * Fonction pour gérer la déconnexion d'un utilisateur.
 */
const logOut = (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.status(400).json({ msg: "Impossible de se déconnecter" });
                return;
            }
            res.status(200).json({ msg: "Vous êtes déconnecté" });
        });
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
    }
};
exports.logOut = logOut;
