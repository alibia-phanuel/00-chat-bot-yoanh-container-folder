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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const uuid_1 = require("uuid");
const User_1 = __importDefault(require("../models/User"));
const argon2_1 = __importDefault(require("argon2"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.default.findAll({
            attributes: ["uuid", "name", "email", "role"],
        });
        res.status(200).json(response);
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
    }
});
exports.getUsers = getUsers;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield User_1.default.findOne({
            attributes: ["uuid", "name", "email", "role"],
            where: {
                uuid: req.params.id,
            },
        });
        res.status(200).json(response);
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
        res.status(500).json({ msg: error.message });
    }
});
exports.getUserById = getUserById;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Données reçues :", req.body);
        console.log("Password:", req.body.password);
        console.log("Confirm Password:", req.body.confirmPassword);
        const { name, email, password, confirmPassword, role } = req.body;
        if (!password || !confirmPassword || password.trim() === "") {
            res.status(400).json({ msg: "Le mot de passe est requis" });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({
                msg: "Le mot de passe et la confirmation ne correspondent pas",
            });
            return;
        }
        if (password === "" || password === null)
            res.status(404).json({ msg: "Mot de passe vide" });
        if (password !== confirmPassword) {
            res.status(400).json({
                msg: "Le mot de passe et la confirmation ne correspondent pas",
            });
            return;
        }
        const hashPassword = yield argon2_1.default.hash(password);
        yield User_1.default.create({
            uuid: (0, uuid_1.v4)(), // Génère un UUID unique
            name,
            email,
            password: hashPassword,
            role,
        });
        res.status(201).json({ msg: "Utilisateur créé avec succès" });
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
        res.status(400).json({ msg: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: {
                uuid: req.params.id,
            },
        });
        if (!user)
            res.status(404).json({ msg: "Utilisateur non trouvé" });
        const { name, email, password, confirmPassword, role } = req.body;
        let hashPassword;
        if (password === "" || password === null) {
            hashPassword = user === null || user === void 0 ? void 0 : user.password;
        }
        else {
            hashPassword = yield argon2_1.default.hash(password !== null && password !== void 0 ? password : "");
        }
        if (password !== confirmPassword)
            res.status(400).json({
                msg: "Le mot de passe et la confirmation du mot de passe ne peuvent pas être utilisés",
            });
        yield User_1.default.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        }, {
            where: {
                id: user === null || user === void 0 ? void 0 : user.id,
            },
        });
        res.status(200).json({ msg: "Utilisateur mis à jour" });
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
        res.status(400).json({ msg: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({
            where: { uuid: req.params.id },
        });
        if (!user) {
            res.status(404).json({ msg: "Utilisateur non trouvé" });
            return;
        }
        yield User_1.default.destroy({ where: { uuid: req.params.id } });
        res.status(200).json({ msg: "Utilisateur supprimé avec succès" });
    }
    catch (error) {
        next(error instanceof Error ? error : new Error(String(error)));
        res.status(500).json({ msg: "Erreur serveur : " + error.message });
    }
});
exports.deleteUser = deleteUser;
