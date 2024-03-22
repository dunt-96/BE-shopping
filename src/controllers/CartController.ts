import CartService from "../services/CartService";

const createCart = async (req, res) => {
    try {
        console.log('add cart');
        const newCart = req.body;
        const result = await CartService.createCart(newCart);
        return res.status(200).json(result);
    } catch (error) {
        res.status(200).json(error);
    }
}

export default {
    createCart
}