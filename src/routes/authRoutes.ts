import {Router} from 'express';
import {loginController, registerController} from "../controllers/authController";
import {authMiddleware} from "../middlewares/authMiddleware";

const router = Router();

// register
router.post('/register', registerController);

// login
router.post('/login', loginController);

export default router;
