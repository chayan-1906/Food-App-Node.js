import {Router} from 'express';
import {testUserController} from "../controllers/testController";

const router = Router();

// routes
router.get('/test-user', testUserController);

export default router;
