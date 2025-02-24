"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Accès refusé, token manquant." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Token invalide." });
    }
};
exports.verifyToken = verifyToken;
// Vérification des rôles (admin ou employer)
const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(403).json({ message: "Accès refusé." });
            return;
        }
        if (req.user.role !== role) {
            res.status(403).json({ message: "Permission insuffisante." });
            return;
        }
        next(); // Poursuit l'exécution
    };
};
exports.verifyRole = verifyRole;
