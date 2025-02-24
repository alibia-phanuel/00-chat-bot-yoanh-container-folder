import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import sequelize from "./config/db";
import SequelizeStore from "connect-session-sequelize";
import homeRoutes from "./routes/homeRoutes.routes";
import UserRoute from "./routes/UserRoute.routes";
import AuthRoute from "./routes/AuthRoute.routes";
import aqRoute from "./routes/aq.routes";
import ProductRoute from "./routes/ProductRoute.routes";
import errorHandler from "./middleware/errorHandler";
dotenv.config(); // Charger les variables d'environnement dès le début
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: sequelize,
});
// Vérification des variables d'environnement essentielles
const requiredEnvVars = ["SESS_SECRET", "DB_HOST", "DB_USER", "DB_PASSWORD"];
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(
      `❌ Erreur: la variable d'environnement ${envVar} est manquante.`
    );
    process.exit(1);
  }
});

// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuration des middlewares
app.use(express.json()); // Parser JSON (à mettre avant les routes)
app.use(express.urlencoded({ extended: true })); // Pour gérer les requêtes POST

// Configuration de la session (avant les routes qui en ont besoin)
app.use(
  session({
    secret: process.env.SESS_SECRET as string,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: false, // Passer à true en production avec HTTPS
      httpOnly: true, // Sécuriser contre les attaques XSS
    },
  })
);

// Configuration CORS
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Changer 3000 par 5173
  })
);
// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, "..", "public")));

// Déclaration des routes
app.use(AuthRoute); // Routes d'authentification d'abord
app.use(UserRoute); // Routes utilisateur
app.use(ProductRoute); // Routes Produits
app.use(aqRoute); // Routes Question
app.use("/", homeRoutes); // Route de la page d'accueil

// Middleware global pour la gestion des erreurs (toujours à la fin)
app.use(errorHandler);

// Lancer le serveur
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur lors du démarrage du serveur:", error);
    process.exit(1);
  }
};

// // Synchronisation des modèles avec la base de données
// Synchronisation Sequelize
// sequelize
//   .sync({ force: false }) // Mets `force: true` pour reset la DB à chaque lancement
//   .then(() => console.log("✅ Base de données synchronisée"))
//   .catch((err) => console.error("❌ Erreur de connexion DB:", err));
// store.sync();
startServer();
