import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import {generateInvalidCode, generateMissingCode, generateNotFoundCode} from "../utils/generateErrorCodes";
import {isBooleanInvalid, isNumberInvalid, isStringInvalid, updateIfValid} from "../utils/Helpers";
import CategorySchema from "../models/CategorySchema";
import FoodSchema, {IFood} from "../models/FoodSchema";

const createFoodController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {title, description, price, imageUrl, tags, category, code, isAvailable, restaurant, rating} = req.body;

        // validation
        if (isStringInvalid(title)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('title'),
                errorMsg: 'Food title is missing',
            }));
        }
        if (isStringInvalid(description)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('description'),
                errorMsg: 'Food description is missing',
            }));
        }
        if (isNumberInvalid(price)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('price'),
                errorMsg: 'Food price is missing',
            }));
        }
        if (isStringInvalid(restaurant)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('restaurant'),
                errorMsg: 'Restaurant is missing',
            }));
        }

        // create new food
        const savedFood = await FoodSchema.create({title, description, price, imageUrl, tags, category, code, isAvailable, restaurant, rating});

        return res.status(201).send(new ApiResponse({
            success: true,
            message: 'Food created',
            food: savedFood,
        }));
    } catch (error: any) {
        console.log('Error in createFoodController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getAllFoodsController = async (req: Request, res: Response) => {
    try {
        const foods = await FoodSchema.find({});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Foods fetched',
            count: foods.length,
            foods,
        }));
    } catch (error: any) {
        console.log('Error in getAllFoodsController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getFoodByIdController = async (req: Request, res: Response) => {
    try {
        const {id: foodId} = req.params;
        if (isStringInvalid(foodId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('foodId'),
                errorMsg: 'Food ID is missing',
            }));
        }

        const food = await FoodSchema.findById(foodId);
        if (!food) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('food'),
                errorMsg: 'Food not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Food fetched',
            food,
        }));
    } catch (error: any) {
        console.log('Error in getFoodByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getFoodsByRestaurantIdController = async (req: Request, res: Response) => {
    try {
        const {id: restaurantId} = req.params;
        if (isStringInvalid(restaurantId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('restaurantId'),
                errorMsg: 'Restaurant ID is missing',
            }));
        }

        const foods = await FoodSchema.find({restaurant: restaurantId});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Foods fetched',
            foods,
        }));
    } catch (error: any) {
        console.log('Error in getFoodByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const updateFoodByIdController = async (req: Request, res: Response) => {
    try {
        const {id: foodId} = req.params;
        const {title, description, price, imageUrl, tags, category, code, isAvailable, restaurant, rating} = req.body;
        if (isStringInvalid(foodId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('foodId'),
                errorMsg: 'Food ID is missing',
            }));
        }

        // validations
        // if ('title' in req.body && (typeof title !== 'string' || !title.trim() || equals(title.trim(), 'null'))) {
        if ('title' in req.body && isStringInvalid(title)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('title'),
                errorMsg: 'Invalid title',
            }));
        }
        if ('description' in req.body && isStringInvalid(description)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('description'),
                errorMsg: 'Invalid description',
            }));
        }
        if ('price' in req.body && isNumberInvalid(price)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('price'),
                errorMsg: 'Invalid price',
            }));
        }
        if ('restaurant' in req.body && isStringInvalid(restaurant)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('restaurant'),
                errorMsg: 'Invalid restaurant',
            }));
        }

        const food = await FoodSchema.findById(foodId);
        if (!food) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('food'),
                errorMsg: 'Food not found',
            }));
        }

        const updateFields: Partial<IFood> = {};

        const titleUpdate = updateIfValid('title', title, food.title, isStringInvalid);
        if (titleUpdate) Object.assign(updateFields, titleUpdate);

        const descriptionUpdate = updateIfValid('description', description, food.description, isStringInvalid);
        if (descriptionUpdate) Object.assign(updateFields, descriptionUpdate);

        const priceUpdate = updateIfValid('price', price, food.price, isNumberInvalid);
        if (priceUpdate) Object.assign(updateFields, priceUpdate);

        const imageUrlUpdate = updateIfValid('imageUrl', imageUrl, food.imageUrl, isStringInvalid);
        if (imageUrlUpdate) Object.assign(updateFields, imageUrlUpdate);

        const tagsUpdate = updateIfValid('tags', tags, food.tags, isStringInvalid);
        if (tagsUpdate) Object.assign(updateFields, tagsUpdate);

        const categoryUpdate = updateIfValid('category', category, food.category, isStringInvalid);
        if (categoryUpdate) Object.assign(updateFields, categoryUpdate);

        const codeUpdate = updateIfValid('code', code, food.code, isStringInvalid);
        if (codeUpdate) Object.assign(updateFields, codeUpdate);

        const isAvailableUpdate = updateIfValid('isAvailable', isAvailable, food.isAvailable, isBooleanInvalid);
        if (isAvailableUpdate) Object.assign(updateFields, isAvailableUpdate);

        const restaurantUpdate = updateIfValid('restaurant', restaurant, food.restaurant, isStringInvalid);
        if (restaurantUpdate) Object.assign(updateFields, restaurantUpdate);

        const ratingUpdate = updateIfValid('rating', rating, food.rating, isNumberInvalid);
        if (ratingUpdate) Object.assign(updateFields, ratingUpdate);

        const updatedFood = await FoodSchema.findByIdAndUpdate(foodId, updateFields, {new: true});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Food updated',
            food: updatedFood,
        }));
    } catch (error: any) {
        console.log('Error in updateFoodByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const deleteFoodByIdController = async (req: Request, res: Response) => {
    try {
        const {id: foodId} = req.params;
        if (isStringInvalid(foodId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('foodId'),
                errorMsg: 'Food ID is missing',
            }));
        }

        const food = await FoodSchema.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('food'),
                errorMsg: 'Food not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Food deleted',
        }));
    } catch (error: any) {
        console.log('Error in deleteFoodByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {createFoodController, getAllFoodsController, getFoodByIdController, getFoodsByRestaurantIdController, updateFoodByIdController, deleteFoodByIdController};
