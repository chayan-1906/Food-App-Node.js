import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {deleteAccountController, getUserController, resetPasswordController, updatePasswordController, updateUserController} from "../controllers/UserController";

const router = Router();

// getUser
router.get('/', authMiddleware, getUserController);

// updateUser
router.put('/', authMiddleware, updateUserController);

// update password
router.post('/update-password', authMiddleware, updatePasswordController);

// reset password
router.post('/reset-password', authMiddleware, resetPasswordController);

// delete account
router.delete('/', authMiddleware, deleteAccountController);

export default router;
