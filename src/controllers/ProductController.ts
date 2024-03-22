import { createProductService, deleteManyProduct, deleteProductService, getAllProductService, getAllTypeService, getDetailProductService, updateProductService } from "../services/ProductService";

export const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description, discount, selled } = req.body;
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: "ERR",
                message: "Input is require",
            });
        }
        console.log('product', req.body);
        // console.log(req.body);
        const newProd = req.body;
        const result = await createProductService(newProd);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        if (!prodId) {
            return res.status(200).json({
                status: 'FAIL',
                message: 'Update fail'
            })
        }

        // return UserService.updateUser(userId, data);
        const result = await deleteProductService(prodId);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        console.log('list id', ids);
        if (!ids) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The Ids is required'
            })
        }

        // return UserService.updateUser(userId, data);
        const result = await deleteManyProduct(ids);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        const data = req.body;
        if (!prodId) {
            return res.status(200).json({
                status: 'FAIL',
                message: 'Update fail'
            })
        }
        console.log('user id', prodId);

        // return UserService.updateUser(userId, data);
        const result = await updateProductService(prodId, data);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        console.log('get all prod');
        const { limit, page, sort, sortBy, filter } = req.query;
        const result = await getAllProductService(limit, page, sort, sortBy, filter)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const getDetailProduct = async (req, res) => {
    try {
        const prodId = req.params.id;
        const result = await getDetailProductService(prodId)

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const getAllType = async (req, res) => {
    try {
        const result = await getAllTypeService();

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
