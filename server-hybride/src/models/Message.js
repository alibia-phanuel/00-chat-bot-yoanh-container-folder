"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des types et de Sequelize
const sequelize_1 = require("sequelize");
// Importation de l'instance de connexion à la base de données
const db_1 = __importDefault(require("../config/db"));
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    from_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: process.env.DEFAULT_PHONE_NUMBER, // Valeur par défaut provenant du fichier .env
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    media_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    media_type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    direction: {
        type: sequelize_1.DataTypes.ENUM("incoming", "outgoing"),
        allowNull: false,
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    tableName: "messages",
    timestamps: false, // La gestion des timestamps (createdAt, updatedAt) n'est pas nécessaire ici
});
// // Association : Un message appartient à un utilisateur
// Message.belongsTo(User, { foreignKey: "user_id", as: "user" });
exports.default = Message;
