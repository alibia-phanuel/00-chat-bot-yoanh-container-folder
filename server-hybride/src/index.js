"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
const homeRoutes_routes_1 = __importDefault(require("./routes/homeRoutes.routes"));
const UserRoute_routes_1 = __importDefault(require("./routes/UserRoute.routes"));
const AuthRoute_routes_1 = __importDefault(require("./routes/AuthRoute.routes"));
const aq_routes_1 = __importDefault(require("./routes/aq.routes"));
const ProductRoute_routes_1 = __importDefault(require("./routes/ProductRoute.routes"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config(); // Charger les variables d'environnement dès le début
const app = (0, express_1.default)();
const sessionStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const store = new sessionStore({
    db: db_1.default,
});
// Vérification des variables d'environnement essentielles
const requiredEnvVars = ["SESS_SECRET", "DB_HOST", "DB_USER", "DB_PASSWORD"];
requiredEnvVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        console.error(`❌ Erreur: la variable d'environnement ${envVar} est manquante.`);
        process.exit(1);
    }
});
// Configuration du moteur de rendu EJS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
// Configuration des middlewares
app.use(express_1.default.json()); // Parser JSON (à mettre avant les routes)
app.use(express_1.default.urlencoded({ extended: true })); // Pour gérer les requêtes POST
// Configuration de la session (avant les routes qui en ont besoin)
app.use((0, express_session_1.default)({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: false, // Passer à true en production avec HTTPS
        httpOnly: true, // Sécuriser contre les attaques XSS
    },
}));
// Configuration CORS
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CORS_ORIGIN || "http://localhost:5173", // Changer 3000 par 5173
}));
// Servir les fichiers statiques
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
// Déclaration des routes
app.use(AuthRoute_routes_1.default); // Routes d'authentification d'abord
app.use(UserRoute_routes_1.default); // Routes utilisateur
app.use(ProductRoute_routes_1.default); // Routes Produits
app.use(aq_routes_1.default); // Routes Question
app.use("/", homeRoutes_routes_1.default); // Route de la page d'accueil
// Middleware global pour la gestion des erreurs (toujours à la fin)
app.use(errorHandler_1.default);
// Lancer le serveur
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("❌ Erreur lors du démarrage du serveur:", error);
        process.exit(1);
    }
});
// // Synchronisation des modèles avec la base de données
// Synchronisation Sequelize
// sequelize
//   .sync({ force: false }) // Mets `force: true` pour reset la DB à chaque lancement
//   .then(() => console.log("✅ Base de données synchronisée"))
//   .catch((err) => console.error("❌ Erreur de connexion DB:", err));
// store.sync();
startServer();
