"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Charger les variables d'environnement
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, // Nom de la base de données
process.env.DB_USER, // Utilisateur de la base de données
process.env.DB_PASSWORD, // Mot de passe de la base de données
{
    host: process.env.DB_HOST, // Hôte de la base de données (généralement "localhost" ou l'adresse IP de ton serveur MySQL)
    dialect: "mysql", // Spécifie que tu utilises MySQL
    logging: false, // Désactiver les logs de requêtes (facultatif)
});
exports.default = sequelize;
