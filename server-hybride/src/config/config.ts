// Importation du module dotenv pour charger les variables d'environnement depuis le fichier .env
import dotenv from "dotenv";
// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();
// Définition de la configuration de l'application, en utilisant les variables d'environnement
export const config = {
  // Port de l'application, avec une valeur par défaut de 3000 si aucune variable d'environnement n'est définie
  port: process.env.PORT || 3000,
  // Clé secrète de Stripe, récupérée depuis les variables d'environnement. Si non définie, une chaîne vide est utilisée.
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
};
