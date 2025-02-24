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
exports.adminOnly = exports.verifyUser = void 0;
const User_1 = __importDefault(require("../models/User"));
require("express-session");
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ msg: "Veuillez vous connecter à votre compte !" });
    }
    const user = yield User_1.default.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user)
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    req.userId = user.id;
    req.role = user.role;
    next();
});
exports.verifyUser = verifyUser;
const adminOnly = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ msg: "Veuillez vous connecter à votre compte !" });
    }
    const user = yield User_1.default.findOne({
        where: {
            uuid: req.session.userId,
        },
    });
    if (!user)
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    if (user.role !== "admin")
        return res.status(403).json({ msg: "Accès restreint" });
    next();
});
exports.adminOnly = adminOnly;
