import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export const authMiddleware = (req, res, next) => {
    // verify a token symmetric
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        // console.log(decoded.foo) // bar
        if (err) {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
        if (user?.isAdmin) {
            next();
        }
        else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
    });
}
export const authUserMiddleware = (req, res, next) => {
    // verify a token symmetric
    const token = req.headers.token.split(' ')[1];
    const userId = req.params.id;
    console.log('token deelte', token);
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(404).json({
                message: err,
                status: 'ERROR'
            });
        }
        console.log('user', user);
        if (user?.isAdmin || user?.id === userId) {
            next();
        }
        else {
            return res.status(404).json({
                message: 'The authentication',
                status: 'ERROR'
            });
        }
    });
}