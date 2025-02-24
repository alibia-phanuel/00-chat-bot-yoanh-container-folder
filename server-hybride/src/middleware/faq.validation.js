"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFAQ = void 0;
const validateFAQ = (req, res, next) => {
    const { question, answer } = req.body;
    if (!question || typeof question !== "string") {
        res.status(400).json({
            message: "La question est obligatoire et doit être une chaîne de caractères.",
        });
        return;
    }
    if (!answer || typeof answer !== "string") {
        res.status(400).json({
            message: "La réponse est obligatoire et doit être une chaîne de caractères.",
        });
        return;
    }
    next(); // Passe au contrôleur si tout est valide
};
exports.validateFAQ = validateFAQ;
