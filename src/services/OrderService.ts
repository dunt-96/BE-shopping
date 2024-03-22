import OrderModel from "../models/OrderModel";

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { orderItems } = newOrder;
            const shippingAddress = {
                fullName: newOrder.fullName,
                address: newOrder.address,
                city: newOrder.city,
                phone: newOrder.phone
            }

            const createOrder = await OrderModel.create({
                orderItems: orderItems,
                shippingAddress: shippingAddress,
                paymentMethod: newOrder.paymentMethod,
                itemPrice: newOrder.itemPrice,
                shippingPrice: newOrder.shippingPrice,
                totalPrice: newOrder.totalPrice,
                user: newOrder.user,
            });
            console.log('createOrder', createOrder);

            if (createOrder) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder,
                })
            }
        } catch (error) {
            reject({ error });
        }
    })
}

export default {
    createOrder
}