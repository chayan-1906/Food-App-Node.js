import {Router} from 'express';
import {authMiddleware} from "../middlewares/authMiddleware";
import {getUserController, updateUserController} from "../controllers/userController";

const router = Router();

// getUser
router.get('/getUser', authMiddleware, getUserController);

// updateUser
router.put('/updateUser', authMiddleware, updateUserController);

export default router;
