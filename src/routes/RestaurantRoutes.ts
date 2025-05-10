import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {createRestaurantController, deleteRestaurantByIdController, getAllRestaurantsController, getRestaurantByIdController} from "../controllers/RestaurantController";

const router = Router();

// createRestaurant
router.post('/', authMiddleware, createRestaurantController);

// getAllRestaurants
router.get('/', getAllRestaurantsController);

// getRestaurantById
router.get('/:id', getRestaurantByIdController);

// deleteRestaurantById
router.delete('/:id', authMiddleware, deleteRestaurantByIdController);

export default router;
