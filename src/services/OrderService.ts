import CartModel from "../models/CartModel";
import OrderModel from "../models/OrderModel";
import Product from "../models/ProductModel";

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

            let orderItemsChecked = [];

            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            selled: +order.amount
                        }
                    },
                    {
                        new: true,
                    }
                );

                if (productData) {
                    return ({
                        status: 'OK',
                        message: 'UPDATE SUCCESS',
                        data: order
                    })
                } else {
                    return ({
                        status: 'ERR',
                        message: 'UPDATE FAIL',
                        data: order,
                    })
                }
            })

            // console.log('list order checked', orderItemsChecked);

            const results = await Promise.all(promises);
            console.log('results', results);

            for (let index = 0; index < results.length; index++) {
                if (results[index].status === "ERR") {
                    return resolve({
                        status: "ERR",
                        message: "UPDATE FAIL",
                        data: results
                    });
                }
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

            if (createOrder) {
                const listIds = orderItemsChecked.map((item) => item.product);
                const deleteItem = await CartModel.deleteMany({
                    product: listIds
                })

                if (!deleteItem) {
                    return {
                        status: "ERR",
                        message: "Đặt hàng thất bại"
                    }
                }

                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createOrder,
                })
            }
        } catch (error) {
        }
    })
}

export default {
    createOrder
}