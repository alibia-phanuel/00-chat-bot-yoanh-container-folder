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
exports.deleteFAQ = exports.updateFAQ = exports.getFAQsById = exports.createFAQ = exports.getFAQs = void 0;
const faq_model_1 = __importDefault(require("../models/faq.model"));
const User_1 = __importDefault(require("../models/User"));
const sequelize_1 = require("sequelize");
const getFAQs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response;
        if (req.role === "admin") {
            response = yield faq_model_1.default.findAll({
                attributes: ["id", "question", "answer"],
                include: [
                    {
                        model: User_1.default,
                        as: "user", // L'alias défini dans votre association
                    },
                ],
                order: [["createdAt", "DESC"]], // Tri par date de création (du plus récent au moins récent)
            });
        }
        else {
            response = yield faq_model_1.default.findAll({
                attributes: ["id", "question", "answer"],
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
exports.getFAQs = getFAQs;
const createFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifie si userId est défini et est un nombre
        const userId = req.userId;
        if (typeof userId !== "number") {
            res.status(400).json({
                error: "L'identifiant de l'utilisateur est obligatoire et doit être un numéro",
            });
        }
        const { question, answer } = req.body;
        yield faq_model_1.default.create({
            question: question,
            answer: answer,
            userId,
        });
        res.status(201).json({ msg: "La question/reponse a créé avec succès !" });
    }
    catch (error) {
        // Transmission de l'erreur au middleware global
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.createFAQ = createFAQ;
const getFAQsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifier si le produit existe avant de continuer
        const question = yield faq_model_1.default.findOne({
            where: {
                id: req.params.id, // Assurer que `uuid` est un paramètre correct
            },
        });
        if (!question) {
            res.status(404).json({ msg: "Questionaire non trouvé" });
        }
        // Vérifier que `req.role` et `req.userId` existent
        if (!req.role || !req.userId) {
            res.status(400).json({ msg: "Informations utilisateur manquantes" });
        }
        let response;
        // Logique basée sur le rôle de l'utilisateur
        if (req.role === "admin") {
            response = yield faq_model_1.default.findOne({
                attributes: ["id", "question", "answer"],
                where: {
                    id: question === null || question === void 0 ? void 0 : question.id,
                },
                include: [
                    {
                        model: User_1.default,
                        attributes: ["name", "email"],
                        as: "user", // L'alias défini dans votre association
                    },
                ],
            });
        }
        else {
            if (req.userId !== (question === null || question === void 0 ? void 0 : question.userId))
                res.status(403).json({ msg: "Accès non autorisé" });
            response = yield faq_model_1.default.findOne({
                attributes: ["id", "question", "answer"],
                where: {
                    [sequelize_1.Op.and]: [{ id: question === null || question === void 0 ? void 0 : question.id }, { userId: req.userId }],
                },
            });
        }
        // Si le produit n'existe pas pour l'utilisateur, retour d'une erreur
        if (!response) {
            res.status(404).json({
                msg: "Questioniare non autorisé ou introuvable pour cet utilisateur",
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
exports.getFAQsById = getFAQsById;
const updateFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Vérifier si le produit existe avant de continuer
        const faq = yield faq_model_1.default.findOne({
            where: {
                id: req.params.id, // Assurer que `id` est un paramètre correct
            },
        });
        if (!faq) {
            res.status(404).json({ msg: "Produit non trouvé" });
        }
        // Vérifier que `req.role` et `req.userId` existent
        if (!req.role || !req.userId) {
            res.status(400).json({ msg: "Informations utilisateur manquantes" });
        }
        let response;
        // Logique basée sur le rôle de l'utilisateur
        if (req.role === "admin") {
            const { question, answer } = req.body;
            yield faq_model_1.default.update({ question, answer }, { where: { id: faq === null || faq === void 0 ? void 0 : faq.id } });
        }
        else {
            if (req.userId !== (faq === null || faq === void 0 ? void 0 : faq.userId))
                res.status(403).json({ msg: "Accès non autorisé" });
            response = yield faq_model_1.default.findOne({
                attributes: ["id", "question", "answer"],
                where: {
                    [sequelize_1.Op.and]: [{ id: faq === null || faq === void 0 ? void 0 : faq.id }, { userId: req.userId }],
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
exports.updateFAQ = updateFAQ;
const deleteFAQ = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const faq = yield faq_model_1.default.findByPk(id);
        if (!faq)
            res.status(404).json({ message: "FAQ non trouvée" });
        yield (faq === null || faq === void 0 ? void 0 : faq.destroy());
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});
exports.deleteFAQ = deleteFAQ;
