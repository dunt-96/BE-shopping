import express from "express";
import CartController from "../controllers/CartController";

const router = express.Router();

router.post('/create', CartController.createCart)
router.get('/get-all', CartController.getAllItemInCart)
router.delete('/delete/:productId', CartController.deleteItemInCart)
router.delete('/delete-many', CartController.deleteManyItemsInCart)

export default router;