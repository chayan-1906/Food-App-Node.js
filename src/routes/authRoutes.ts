import {Router} from 'express';
import {registerController} from "../controllers/authController";

const router = Router();

// register
router.post('/register', registerController);

export default router;
