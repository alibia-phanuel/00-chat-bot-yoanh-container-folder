"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des types de données de Sequelize
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db")); // Connexion à la base de données
// Définition du modèle User avec Sequelize
class User extends sequelize_1.Model {
}
// Initialisation du modèle Sequelize
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    uuid: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100],
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    signupDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: db_1.default,
    tableName: "users",
    freezeTableName: true,
    timestamps: true, // ✅ Active createdAt et updatedAt
});
// Importation de Message et association
const Message_1 = __importDefault(require("./Message")); // Placer cette importation après la définition du modèle User
// Association : Un utilisateur peut avoir plusieurs messages
User.hasMany(Message_1.default, { foreignKey: "user_id", as: "messages" });
exports.default = User;
