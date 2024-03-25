import CartModel from "../models/CartModel";
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
                const listIds = orderItems.map((item) => item.product);
                const deleteItemsFromCart = await CartModel.deleteMany({
                    product: listIds
                })

                if (!deleteItemsFromCart) {
                    return resolve({
                        status: "ERR",
                        message: "Đặt hàng thất bại"
                    })
                }

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