import {Router} from 'express';
import {authMiddleware} from "../middlewares/authMiddleware";
import {deleteAccountController, getUserController, resetPasswordController, updatePasswordController, updateUserController} from "../controllers/userController";

const router = Router();

// getUser
router.get('/getUser', authMiddleware, getUserController);

// updateUser
router.put('/updateUser', authMiddleware, updateUserController);

// update password
router.post('/updatePassword', authMiddleware, updatePasswordController);

// reset password
router.post('/resetPassword', authMiddleware, resetPasswordController);

// delete account
router.delete('/deleteAccount', authMiddleware, deleteAccountController);

export default router;
