"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faq_1 = require("../controllers/faq");
const authUser_1 = require("../middleware/authUser");
const router = express_1.default.Router();
router.get("/question", authUser_1.verifyUser, authUser_1.adminOnly, faq_1.getFAQs);
router.post("/question", authUser_1.verifyUser, authUser_1.adminOnly, faq_1.createFAQ);
router.get("/question/:id", authUser_1.verifyUser, authUser_1.adminOnly, faq_1.getFAQsById);
router.patch("/question/:id", authUser_1.verifyUser, authUser_1.adminOnly, faq_1.updateFAQ);
router.delete("/question/:id", authUser_1.verifyUser, authUser_1.adminOnly, faq_1.deleteFAQ);
exports.default = router;
