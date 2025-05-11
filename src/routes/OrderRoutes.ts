import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {adminMiddleware} from "../middlewares/AdminMiddleware";
import {cancelOrderById, getAllOrdersController, getOrderByIdController, getOrdersByUserIdController, modifyOrderStatusController, placeOrderController} from "../controllers/OrderController";

const router = Router();

// placeOrder
router.post('/', authMiddleware, placeOrderController);

// getAllOrders
router.get('/', getAllOrdersController);

// getOrderById - Only match 24-character ObjectId
router.get('/:id([0-9a-fA-F]{24})', getOrderByIdController)

// getOrdersByUserIdController
router.get('/user', authMiddleware, getOrdersByUserIdController);

// modifyOrderStatus
router.put('/status/:id', authMiddleware, adminMiddleware, modifyOrderStatusController);

// cancelOrderById
router.delete('/:id', authMiddleware, adminMiddleware, cancelOrderById);

export default router;
