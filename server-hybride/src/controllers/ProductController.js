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
exports.deleteProducts = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("../models/User"));
/**
 * Contrôleur pour afficher la page d'accueil.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */
const getProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response;
        if (req.role === "admin") {
            response = yield Product_1.default.findAll({
                attributes: ["uuid", "name", "price"],
                include: [
                    {
                        model: User_1.default,
                    },
                ],
                order: [["createdAt", "DESC"]], // Tri par date de création (du plus récent au moins récent)
            });
        }
        else {
            response = yield Product_1.default.findAll({
                attributes: ["uuid", "name", "price"],
                where: {
                    userId: req.userId,
                },
                include: [
                    {
                        model: User_1.default,
                        attributes: ["name", "email"],
                    },
                ],
                order: [["createdAt", "DESC"]], // Tri par date de création (du plus récent au moins récent)
            });
        }
        res.status(200).json(response);
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
        res.status(500).json({ msg: error.message });
    }
});
exports.getProducts = getProducts;
const createProduct = (req, // Typage du body
res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifie si userId est défini et est un nombre
        const userId = req.userId;
        if (typeof userId !== "number") {
            return res.status(400).json({
                error: "L'identifiant de l'utilisateur est obligatoire et doit être un numéro",
            });
        }
        const { name, price } = req.body;
        yield Product_1.default.create({
            name: name,
            price: price,
            userId,
            uuid: (0, uuid_1.v4)(), // Génère un UUID unique
        });
        res.status(201).json({ msg: "Produit créé avec succès !" });
    }
    catch (error) {
        // Transmission de l'erreur au middleware global
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.createProduct = createProduct;
const getProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifier si le produit existe avant de continuer
        const product = yield Product_1.default.findOne({
            where: {
                uuid: req.params.id, // Assurer que `uuid` est un paramètre correct
            },
        });
        if (!product) {
            res.status(404).json({ msg: "Produit non trouvé" });
        }
        // Vérifier que `req.role` et `req.userId` existent
        if (!req.role || !req.userId) {
            res.status(400).json({ msg: "Informations utilisateur manquantes" });
        }
        let response;
        // Logique basée sur le rôle de l'utilisateur
        if (req.role === "admin") {
            response = yield Product_1.default.findOne({
                attributes: ["uuid", "name", "price"],
                where: {
                    id: product === null || product === void 0 ? void 0 : product.id,
                },
                include: [
                    {
                        model: User_1.default,
                        attributes: ["name", "email"],
                    },
                ],
            });
        }
        else {
            if (req.userId !== (product === null || product === void 0 ? void 0 : product.userId))
                res.status(403).json({ msg: "Accès non autorisé" });
            response = yield Product_1.default.findOne({
                attributes: ["uuid", "name", "price"],
                where: {
                    [sequelize_1.Op.and]: [{ id: product === null || product === void 0 ? void 0 : product.id }, { userId: req.userId }],
                },
            });
        }
        // Si le produit n'existe pas pour l'utilisateur, retour d'une erreur
        if (!response) {
            res.status(404).json({
                msg: "Produit non autorisé ou introuvable pour cet utilisateur",
            });
        }
        // Retourner la réponse si tout est OK
        res.status(200).json(response);
    }
    catch (error) {
        // Transmission de l'erreur au middleware global
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.getProductById = getProductById;
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifier si le produit existe avant de continuer
        const product = yield Product_1.default.findOne({
            where: {
                uuid: req.params.id, // Assurer que `uuid` est un paramètre correct
            },
        });
        if (!product) {
            res.status(404).json({ msg: "Produit non trouvé" });
        }
        // Vérifier que `req.role` et `req.userId` existent
        if (!req.role || !req.userId) {
            res.status(400).json({ msg: "Informations utilisateur manquantes" });
        }
        let response;
        // Logique basée sur le rôle de l'utilisateur
        if (req.role === "admin") {
            const { name, price } = req.body;
            yield Product_1.default.update({ name, price }, { where: { id: product === null || product === void 0 ? void 0 : product.id } });
        }
        else {
            if (req.userId !== (product === null || product === void 0 ? void 0 : product.userId))
                res.status(403).json({ msg: "Accès non autorisé" });
            response = yield Product_1.default.findOne({
                attributes: ["uuid", "name", "price"],
                where: {
                    [sequelize_1.Op.and]: [{ id: product === null || product === void 0 ? void 0 : product.id }, { userId: req.userId }],
                },
            });
        }
        // Retourner la réponse si tout est OK
        res.status(200).json({ msg: "Produit modifié avec succès !" });
    }
    catch (error) {
        // Transmission de l'erreur au middleware global
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.updateProduct = updateProduct;
const deleteProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        if (!product)
            res.status(404).json({ msg: "Données non trouvées" });
        if (req.role === "admin") {
            yield Product_1.default.destroy({
                where: {
                    id: product === null || product === void 0 ? void 0 : product.id,
                },
            });
        }
        else {
            if (req.userId !== (product === null || product === void 0 ? void 0 : product.userId))
                res.status(403).json({ msg: "Accès restreint" });
            yield Product_1.default.destroy({
                where: {
                    [sequelize_1.Op.and]: [{ id: product === null || product === void 0 ? void 0 : product.id }, { userId: req.userId }],
                },
            });
        }
        res.status(200).json({ msg: "Le produit a été supprimé avec succès" });
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
});
exports.deleteProducts = deleteProducts;
