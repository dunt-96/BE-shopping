import express from 'express';
import UserController from '../controllers/UserController';
import { authMiddleware, authUserMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/sign-up', UserController.createUser)
router.post('/sign-in', UserController.loginUser)
router.post('/logout', UserController.logoutUser)
router.put('/update-user/:id', UserController.updateUser)
router.delete('/delete-user/:id', authMiddleware, UserController.deleteUser)
router.get('/get-all', authMiddleware, UserController.getAll)
router.get('/get-detail/:id', authUserMiddleware, UserController.getDetail)
router.post('/refresh-token', UserController.refreshToken)
router.post('/upload-avatar', UserController.uploadAvatar)
router.delete('/delete-many', authMiddleware, UserController.deleteMany)

export default router;