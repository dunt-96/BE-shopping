import jwt from 'jsonwebtoken';

export const generateAccessToken = async (payload) => {
    console.log('payload', payload);
    const accessToken = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })

    return accessToken;
}

export const generateRefreshAccessToken = async (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, { expiresIn: '365d' })

    return refresh_token;
}

export const refreshTokenService = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('token refresh', token);
            // JsonWebTokenError
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                    resolve({
                        status: "ERROR",
                        message: "The authentication"
                    })
                }
                console.log('USER', user);
                const access_token = await generateAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin
                })
                console.log('access_token', access_token);
                return resolve({
                    status: "OK",
                    message: "Success",
                    access_token
                });
            });

        } catch (error) {
            return reject({
                message: error
            })
        }
    })
}