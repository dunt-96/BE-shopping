import CartService from "../services/CartService";

const createCart = async (req, res) => {
    try {
        const newCart = req.body;
        const result = await CartService.createCart(newCart);
        return res.status(200).json(result);
    } catch (error) {
        res.status(200).json(error);
    }
}
const getAllItemInCart = async (req, res) => {
    try {
        const { limit, page, sort, sortBy, filter } = req.query;
        const result = await CartService.getAllItemInCart(limit, page, sort, sortBy, filter)
        return res.status(200).json(result);
    } catch (error) {
        res.status(200).json(error);
    }
}

const deleteItemInCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await CartService.deleteIemInCart(productId);
        return res.status(200).json(result);
    } catch (error) {
        res.status(200).json(error);
    }
}

export default {
    createCart,
    getAllItemInCart,
    deleteItemInCart
}