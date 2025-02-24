// Importation des types et de Sequelize
import { DataTypes, Model } from "sequelize";
// Importation de l'instance de connexion à la base de données
import sequelize from "../config/db";
import User from "./User"; // On suppose que vous avez un modèle "User" pour les utilisateurs (Chef, Employé)

class Message extends Model {
  public id!: number;
  public from_number!: string; // Le numéro de téléphone de l'expéditeur
  public message!: string; // Le contenu du message
  public media_url!: string | null; // URL du média (photo, vidéo, etc.)
  public media_type!: string; // Type de média (image, vidéo, etc.)
  public direction!: "incoming" | "outgoing"; // Direction du message (entrant ou sortant)
  public timestamp!: Date; // Date d'envoi
  public user_id!: number; // L'ID de l'utilisateur qui a envoyé le message

  // Ajout des associations
  public readonly user?: User; // Associe l'utilisateur
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    from_number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: process.env.DEFAULT_PHONE_NUMBER, // Valeur par défaut provenant du fichier .env
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    media_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direction: {
      type: DataTypes.ENUM("incoming", "outgoing"),
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "messages",
    timestamps: false, // La gestion des timestamps (createdAt, updatedAt) n'est pas nécessaire ici
  }
);

// // Association : Un message appartient à un utilisateur
// Message.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default Message;
