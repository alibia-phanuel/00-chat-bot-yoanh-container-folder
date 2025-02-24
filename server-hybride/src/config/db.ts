import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Charger les variables d'environnement

const sequelize = new Sequelize(
  process.env.DB_NAME as string, // Nom de la base de données
  process.env.DB_USER as string, // Utilisateur de la base de données
  process.env.DB_PASSWORD as string, // Mot de passe de la base de données
  {
    host: process.env.DB_HOST, // Hôte de la base de données (généralement "localhost" ou l'adresse IP de ton serveur MySQL)
    dialect: "mysql", // Spécifie que tu utilises MySQL
    logging: false, // Désactiver les logs de requêtes (facultatif)
  }
);

export default sequelize;
