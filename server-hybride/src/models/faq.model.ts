import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./User"; // Import du modèle User

class FAQ extends Model {
  public id!: number;
  public question!: string;
  public answer!: string;
  public userId!: number; // Clé étrangère
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

FAQ.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // ✅ Utilisation du modèle User directement
        key: "id",
      },
      onDelete: "CASCADE", // ✅ Supprime les FAQs si l'utilisateur est supprimé
    },
  },
  {
    sequelize,
    tableName: "faqs",
    timestamps: true, // ✅ Activation des timestamps
  }
);

// Associations après l'initialisation
User.hasMany(FAQ, { foreignKey: "userId", as: "faqs" });
FAQ.belongsTo(User, { foreignKey: "userId", as: "user" });

export default FAQ;
