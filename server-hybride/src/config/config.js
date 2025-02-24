"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// Importation du module dotenv pour charger les variables d'environnement depuis le fichier .env
const dotenv_1 = __importDefault(require("dotenv"));
// Chargement des variables d'environnement depuis le fichier .env
dotenv_1.default.config();
// Définition de la configuration de l'application, en utilisant les variables d'environnement
exports.config = {
    // Port de l'application, avec une valeur par défaut de 3000 si aucune variable d'environnement n'est définie
    port: process.env.PORT || 3000,
    // Clé secrète de Stripe, récupérée depuis les variables d'environnement. Si non définie, une chaîne vide est utilisée.
    stripeSecret: process.env.STRIPE_SECRET_KEY || "",
};
