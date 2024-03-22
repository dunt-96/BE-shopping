import express from "express";
import CartController from "../controllers/CartController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/create', CartController.createCart)

export default router;