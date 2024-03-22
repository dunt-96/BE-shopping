import { refreshTokenService } from '../services/JwtService';
import UserService from '../services/UserService';

const createUser = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password, confirmPassword, phoneNumber } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password || !confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email is not valid'
            })
        }
        else if (password != confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Password and Confirm password must be the same'
            })
        }
        const result = await UserService.createUser(req.body);
        console.log('check email', isCheckEmail);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);

        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Email is not valid'
            })
        }
        const { refresh_token, ...newRes } = await UserService.loginUser(req.body);
        console.log('refreshtoken', refresh_token);
        res.cookie(
            'refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        }
        )
        console.log('newRes', newRes);
        return res.status(200).json({ ...newRes, refresh_token });
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(200).json({
                status: 'FAIL',
                message: 'Update fail'
            })
        }

        // return UserService.updateUser(userId, data);
        const result = await UserService.deleteUser(userId);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'FAIL',
                message: 'Update fail'
            })
        }
        console.log('user id', userId);

        // return UserService.updateUser(userId, data);
        const result = await UserService.updateUser(userId, data);
        return res.status(200).json(result);

    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAll = async (req, res) => {
    try {
        const result = await UserService.getAll();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetail = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await UserService.getDetail(userId);

        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        console.log('refresh_token123', token);
        if (!token) {
            return res.status(200).json({
                status: "ERR",
                message: 'The token is require'
            })
        }

        const response = await refreshTokenService(token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: "OK",
            message: "Logout success"
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const uploadAvatar = async (req, res) => {
    try {
        console.log('data upload file', req.body);
        return res.status(200).json({
            status: "OK",
            message: "Logout success"
        });
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
const deleteMany = async (req, res) => {
    try {
        const ids = req.body;
        console.log('list id', ids);
        if (!ids) {
            return res.status(200).json({
                status: "ERR",
                message: "The ids is required"
            })
        }
        const response = await UserService.deleteManyUsers(ids);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export default {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAll,
    getDetail,
    refreshToken,
    logoutUser,
    uploadAvatar,
    deleteMany
}