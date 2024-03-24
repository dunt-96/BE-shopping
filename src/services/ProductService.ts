import Product from "../models/ProductModel";

//    name: { type: String, required: true, unique: true },
//         image: { type: String, required: true },
//         type: { type: String, required: true },
//         price: { type: Number, required: true },
//         countInStock: { type: Number, required: true },
//         rating: { type: Number, required: true },
//         description: { type: String },
//         discount: { type: Number },
//         selled: { type: Number }

export const createProductService = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount, selled } = newProduct;
        try {
            const isExistProd = await Product.find({
                name: name
            })

            if (isExistProd.length) {
                return resolve({
                    status: 'ERR',
                    message: 'Product is already exist'
                })
            }

            console.log('running here');

            const createProd = await Product.create(
                {
                    name,
                    image,
                    type,
                    price,
                    countInStock,
                    rating,
                    description: description ?? '',
                    discount: discount ?? 0,
                    selled: selled ?? 0
                }
            )

            console.log('product', createProd);

            if (createProd) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createProd,
                })
            }

        } catch (error) {
            console.log(error);
            reject({
                message: error
            });
        }
    })
}

export const deleteProductService = (prodId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProd = await Product.findById(prodId);
            if (!checkProd) {
                return resolve({
                    status: "ERR",
                    message: "Product is not exist",
                });
            }

            const deleteProd = await Product.findOneAndDelete(prodId);

            // if (deleteUser.deletedCount == 0) {
            //     return resolve({
            //         status: "FAIL",
            //         message: "Delete fail",
            //     });
            // }

            return resolve({
                status: "OK",
                message: "Delete success",
                data: deleteProd
            });
        } catch (error) {
            reject({
                message: error
            });
        }
    });
}
export const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteProd = await Product.deleteMany({ _id: ids });

            console.log('delete', deleteProd);
            return resolve({
                status: "OK",
                message: "Delete success",
            });
        } catch (error) {
            reject({
                message: error
            });
        }
    });
}
export const updateProductService = (userId, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = Product.findOne({
                id: userId
            })

            if (checkUser === null) {
                return resolve({
                    status: "FAIL",
                    message: "User is not exist",
                });
            }

            const updateUser = await Product.findByIdAndUpdate(userId, body, { new: true });

            console.log('update user running');

            resolve({
                status: "OK",
                message: "Update success",
                data: updateUser
            });
        } catch (error) {
            reject({
                message: error
            });
        }
    });
}

export const getAllProductService = (limit: number, page: number = 0, sort, sortBy: string = 'name', filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProd = await Product.countDocuments();
            const data = await Product.find().limit(limit).skip(page * limit).sort({
                [sortBy]: sort ?? 'asc'
            });

            if (filter) {
                const labelFilter = filter[0];
                const totalProdWithType = await Product.find({ [labelFilter]: { '$regex': filter[1] } });
                const allObjectFilter = await Product.find({ [labelFilter]: { '$regex': filter[1] } }).limit(limit).skip(page * limit);
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allObjectFilter,
                    total: totalProdWithType.length,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProd / limit)
                })
            }

            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort);

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: allProductSort,
                    total: totalProd,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProd / limit)
                })
            }
            // const sortObj = {

            // };
            // sortObj[sortBy] = sort;
            // console.log('sort prod', sortObj);
            const allProduct = await Product.find().limit(limit).skip(page * limit);


            resolve({
                status: "OK",
                message: "SUCCESS",
                data: allProduct,
                total: totalProd,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProd / limit)
            })
        } catch (error) {
        }
    });
}

export const getDetailProductService = (prodId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProd = await Product.findById(prodId);

            if (!checkProd) {
                return resolve({
                    status: "FAIL",
                    message: "Not exist user"
                })
            }

            return resolve({
                status: "OK",
                message: "Success",
                data: checkProd
            });
        } catch (error) {
            return reject({
                message: error
            })
        }
    })
}
export const getAllTypeService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')

            return resolve({
                status: "OK",
                message: "Success",
                data: allType
            });
        } catch (error) {
            return reject({
                message: error
            })
        }
    })
}
