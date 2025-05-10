import {Router} from 'express';
import {authMiddleware} from "../middlewares/AuthMiddleware";
import {createCategoryController, deleteCategoryByIdController, getAllCategoriesController, getCategoryByIdController, updateCategoryByIdController} from "../controllers/CategoryController";

const router = Router();

// createCategory
router.post('/', authMiddleware, createCategoryController);

// getAllCategories
router.get('/', getAllCategoriesController);

// getCategoryById
router.get('/:id', getCategoryByIdController);

// updateCategoryById
router.put('/:id', authMiddleware, updateCategoryByIdController);

// deleteCategoryById
router.delete('/:id', authMiddleware, deleteCategoryByIdController);

export default router;
