import express from "express";
import { createProduct, deleteMany, deleteProduct, getAllProducts, getAllType, getDetailProduct, updateProduct } from "../controllers/ProductController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/create', createProduct)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', authMiddleware, deleteProduct)
router.delete('/delete-many', deleteMany)
router.get('/get-all', getAllProducts)
router.get('/get-detail/:id', getDetailProduct)
router.get('/get-all-type', getAllType)

export default router;