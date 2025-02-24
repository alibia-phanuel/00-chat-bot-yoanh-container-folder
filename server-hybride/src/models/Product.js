"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importation des types et de Sequelize
const sequelize_1 = require("sequelize");
// Importation de l'instance de connexion à la base de données
const db_1 = __importDefault(require("../config/db"));
// Importation du modèle Users pour gérer la relation avec les produits
const User_1 = __importDefault(require("./User"));
// Définition du modèle "Products" avec TypeScript et Sequelize
class Products extends sequelize_1.Model {
}
// Initialisation du modèle Sequelize
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
}, {
    sequelize: db_1.default,
    tableName: "product",
    freezeTableName: true,
});
// Définition des relations
User_1.default.hasMany(Products, { foreignKey: "userId" });
Products.belongsTo(User_1.default, { foreignKey: "userId" });
// Exportation du modèle
exports.default = Products;
