import OrderService from "../services/OrderService";

const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemPrice, shippingPrice, totalPrice, price, address, fullName, city, phone } = req.body;
        if (!paymentMethod || !itemPrice || !shippingPrice || !totalPrice || !address || !fullName || !city || !phone) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is require",
            });
        }
        const newOrder = req.body;
        console.log('newOrder', newOrder);
        const result = await OrderService.createOrder(newOrder);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export default {
    createOrder
}

