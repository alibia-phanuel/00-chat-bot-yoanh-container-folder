"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const User_1 = __importDefault(require("./User")); // Import du modèle User
class FAQ extends sequelize_1.Model {
}
FAQ.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default, // ✅ Utilisation du modèle User directement
            key: "id",
        },
        onDelete: "CASCADE", // ✅ Supprime les FAQs si l'utilisateur est supprimé
    },
}, {
    sequelize: db_1.default,
    tableName: "faqs",
    timestamps: true, // ✅ Activation des timestamps
});
// Associations après l'initialisation
User_1.default.hasMany(FAQ, { foreignKey: "userId", as: "faqs" });
FAQ.belongsTo(User_1.default, { foreignKey: "userId", as: "user" });
exports.default = FAQ;
