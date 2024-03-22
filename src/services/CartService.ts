import CartModel from "../models/CartModel";

const createCart = (newCart) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await CartModel.create(newCart);
            console.log('newCart', newCart);
            if (result) {
                return resolve({
                    status: "OK",
                    message: "Create cart success",
                    data: result
                })
            } else {
                return resolve({
                    status: "ERR",
                    message: "Create cart fail",
                    data: result
                })
            }
        } catch (error) {
            reject(error);
        }
    })
}

export default {
    createCart
}