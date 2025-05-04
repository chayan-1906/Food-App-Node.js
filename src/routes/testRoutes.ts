import {Router} from 'express';
import {testUserController} from "../controllers/testController.ts";

const router = Router();

router.get('/test-user', testUserController);

export default router;
