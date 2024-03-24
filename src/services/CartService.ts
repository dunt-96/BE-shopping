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

const getAllItemInCart = (limit = 100, page = 0, sort, sortBy: string = 'name', filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalItems = await CartModel.countDocuments();
            const data = await CartModel.find().limit(limit).skip(page * limit).sort({
                [sortBy]: sort ?? 'asc'
            });

            if (filter) {
                const labelFilter = filter[0];
                const totalProdWithType = await CartModel.find({ [labelFilter]: { '$regex': filter[1] } });
                const allObjectFilter = await CartModel.find({ [labelFilter]: { '$regex': filter[1] } }).limit(limit).skip(page * limit);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allObjectFilter,
                    total: totalProdWithType.length,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalItems / limit)
                })
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await CartModel.find().limit(limit).skip(page * limit).sort(objectSort);

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allProductSort,
                    total: totalItems,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalItems / limit)
                })
            }
            // const sortObj = {

            // };
            // sortObj[sortBy] = sort;
            // console.log('sort prod', sortObj);
            const allProduct = await CartModel.find().limit(limit).skip(page * limit);
            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allProduct,
                total: totalItems,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalItems / limit)
            })
        } catch (error) {
        }
    });
}

const deleteIemInCart = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('prod id', productId);
            const checkProd = await CartModel.find({
                product: productId
            });
            if (!checkProd) {
                return resolve({
                    status: "ERR",
                    message: "Product is not exist",
                });
            }
            const deleteProd = await CartModel.findOneAndDelete({
                product: productId
            });
            if (deleteProd) {
                return resolve({
                    status: "OK",
                    message: 'Xoá sản phẩm thành công'
                })
            }

            return resolve({
                status: "ERR",
                message: 'Xoá sản phẩm thất bại'
            })
        } catch (error) {
            reject(error);
        }
    });
}

export default {
    createCart,
    getAllItemInCart,
    deleteIemInCart
}