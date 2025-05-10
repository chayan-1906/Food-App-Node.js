import {Router} from 'express';
import {loginController, registerController} from "../controllers/AuthController";
import {authMiddleware} from "../middlewares/AuthMiddleware";

const router = Router();

// register
router.post('/register', registerController);

// login
router.post('/login', loginController);

export default router;
