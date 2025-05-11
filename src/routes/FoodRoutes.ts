import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {createFoodController, deleteFoodByIdController, getAllFoodsController, getFoodByIdController, getFoodsByRestaurantIdController, updateFoodByIdController} from "../controllers/FoodController";

const router = Router();

// createFood
router.post('/', authMiddleware, createFoodController);

// getAllFoods
router.get('/', getAllFoodsController);

// getFoodById
router.get('/:id', getFoodByIdController);

// getFoodsByRestaurantId
router.get('/restaurant/:id', getFoodsByRestaurantIdController);

// updateFoodById
router.put('/:id', authMiddleware, updateFoodByIdController);

// deleteFoodById
router.delete('/:id', authMiddleware, deleteFoodByIdController);

export default router;
