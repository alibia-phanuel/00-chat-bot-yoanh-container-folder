import express from "express";
import {
  getFAQs,
  createFAQ,
  getFAQsById,
  updateFAQ,
  deleteFAQ,
} from "../controllers/faq";
import { verifyUser, adminOnly } from "../middleware/authUser";
const router = express.Router();
router.get("/question", verifyUser, adminOnly, getFAQs);
router.post("/question", verifyUser, adminOnly, createFAQ);
router.get("/question/:id", verifyUser, adminOnly, getFAQsById);
router.patch("/question/:id", verifyUser, adminOnly, updateFAQ);
router.delete("/question/:id", verifyUser, adminOnly, deleteFAQ);

export default router;
