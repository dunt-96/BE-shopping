import bcrypt from 'bcrypt';
import User from "../models/UserModel";
import { generateAccessToken, generateRefreshAccessToken } from "./JwtService";

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, isAdmin, address, avatar } = newUser;
        try {
            const isExistEmail = await User.find({
                email: email
            })

            if (isExistEmail.length) {
                return resolve({
                    status: 'ERR',
                    message: 'Email is already exist'
                })
            }

            const hashPw = bcrypt.hashSync(password, 10);

            console.log('running here');

            const createUser = await User.create(
                {
                    name,
                    email,
                    password: hashPw,
                    phone,
                    isAdmin,
                    address,
                    avatar,
                    confirmPassword
                }
            )

            console.log('user', createUser);

            if (createUser) {
                return resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createUser,
                })
            }

        } catch (error) {
            console.log('catch');
            reject({
                message: error
            });
        }
    })
}
const loginUser = (user) => {

    return new Promise<Record<string, any>>(async (resolve, reject) => {
        const { email, password } = user;
        try {
            const data = await User.findOne({ email: email });

            if (data !== null && data.email === email) {
                const match = await bcrypt.compare(password, data.password);
                if (match) {
                    const access_token = await generateAccessToken({
                        id: data.id,
                        isAdmin: data.isAdmin
                    });

                    const refresh_token = await generateRefreshAccessToken({
                        id: data.id,
                        isAdmin: data.isAdmin
                    });
                    console.log('accesstoken', access_token);
                    return resolve({
                        status: "OK",
                        message: 'Login success',
                        access_token,
                        refresh_token
                        // data: {
                        //     name: data.name,
                        //     email: data.email,
                        //     isAdmin: data.isAdmin,
                        //     access_token,
                        //     refresh_token
                        // }
                    })
                }
                else {
                    return resolve({
                        status: "ERR",
                        message: 'Password is not correct',
                    })
                }
            } else {
                return resolve({
                    status: 'ERR',
                    message: 'Account is not exist',
                })
            }

        } catch (error) {
            console.log('catch');
            reject({
                message: error
            });
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(userId);

            console.log('check user', checkUser);

            if (!checkUser) {
                return resolve({
                    status: "FAIL",
                    message: "User is not exist",
                });
            }

            const deleteUser = await User.findOneAndDelete(userId);

            console.log('delete', deleteUser);

            // if (deleteUser.deletedCount == 0) {
            //     return resolve({
            //         status: "FAIL",
            //         message: "Delete fail",
            //     });
            // }

            return resolve({
                status: "OK",
                message: "Delete success",
                data: deleteUser
            });
        } catch (error) {
            reject({
                message: error
            });
        }
    });
}
const updateUser = (userId, body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = User.findOne({
                id: userId
            })

            if (checkUser === null) {
                return resolve({
                    status: "FAIL",
                    message: "User is not exist",
                });
            }
            const updateUser = await User.findByIdAndUpdate(userId, body, { new: true });
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

const getAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.find();

            return resolve({
                status: "OK",
                data: data
            })
        } catch (error) {
            return reject({
                message: error
            });
        }
    });
}

const getDetail = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findById(userId);

            if (!checkUser) {
                return resolve({
                    status: "FAIL",
                    message: "Not exist user"
                })
            }

            return resolve({
                status: "OK",
                message: "Success",
                data: checkUser
            });
        } catch (error) {
            return reject({
                message: error
            })
        }
    })
}

const deleteManyUsers = (userIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({ _id: userIds });

            return resolve({
                status: "OK",
                message: "Success",
            });
        } catch (error) {
            return reject({
                message: error
            })
        }
    })
}


export default {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAll,
    getDetail,
    deleteManyUsers
};
