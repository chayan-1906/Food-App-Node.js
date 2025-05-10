import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import {generateInvalidCode, generateMissingCode, generateNotFoundCode} from "../utils/generateErrorCodes";
import {equals, isStringInvalid} from "../utils/Helpers";
import CategorySchema from "../models/CategorySchema";

const createCategoryController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {title, imageUrl} = req.body;

        // validation
        if (isStringInvalid(title) || equals(title.trim(), 'null')) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('title'),
                errorMsg: 'Category title is missing',
            }));
        }

        // create new category
        const savedCategory = await CategorySchema.create({title, imageUrl});

        return res.status(201).send(new ApiResponse({
            success: true,
            message: 'Category created',
            category: savedCategory,
        }));
    } catch (error: any) {
        console.log('Error in createCategoryController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getAllCategoriesController = async (req: Request, res: Response) => {
    try {
        const categories = await CategorySchema.find({});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Categories fetched',
            count: categories.length,
            categories,
        }));
    } catch (error: any) {
        console.log('Error in getAllCategoriesController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getCategoryByIdController = async (req: Request, res: Response) => {
    try {
        const {id: categoryId} = req.params;
        if (isStringInvalid(categoryId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('categoryId'),
                errorMsg: 'Category ID is missing',
            }));
        }

        const category = await CategorySchema.findById(categoryId);
        if (!category) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('category'),
                errorMsg: 'Category not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Category fetched',
            category,
        }));
    } catch (error: any) {
        console.log('Error in getCategoryByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const updateCategoryByIdController = async (req: Request, res: Response) => {
    try {
        const {id: categoryId} = req.params;
        const {title, imageUrl} = req.body;
        if (isStringInvalid(categoryId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('categoryId'),
                errorMsg: 'Category ID is missing',
            }));
        }

        if ('title' in req.body && (typeof title !== 'string' || !title.trim() || equals(title.trim(), 'null'))) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('title'),
                errorMsg: 'Invalid Title',
            }));
        }

        const category = await CategorySchema.findByIdAndUpdate(categoryId, {title, imageUrl}, {new: true});
        if (!category) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('category'),
                errorMsg: 'Category not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Category updated',
            category,
        }));
    } catch (error: any) {
        console.log('Error in updateCategoryByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const deleteCategoryByIdController = async (req: Request, res: Response) => {
    try {
        const {id: categoryId} = req.params;
        if (isStringInvalid(categoryId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('categoryId'),
                errorMsg: 'Category ID is missing',
            }));
        }

        const category = await CategorySchema.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('category'),
                errorMsg: 'Category not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Category deleted',
        }));
    } catch (error: any) {
        console.log('Error in deleteCategoryByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {createCategoryController, getAllCategoriesController, getCategoryByIdController, updateCategoryByIdController, deleteCategoryByIdController};
