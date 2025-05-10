import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import {generateInvalid, generateMissingCode, generateNotFound} from "../utils/generateErrorCodes";
import {isStringInvalid} from "../utils/Helpers";
import RestaurantSchema from "../models/RestaurantSchema";

const createRestaurantController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body;

        // validation
        if (isStringInvalid(title)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('title'),
                errorMsg: 'Restaurant title is missing',
            }));
        }
        if (!coords) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalid('coords'),
                errorMsg: 'Invalid coordinated',
            }));
        }

        // create new restaurant
        const savedRestaurant = await RestaurantSchema.create({
            title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
        });

        return res.status(201).send(new ApiResponse({
            success: true,
            message: 'Restaurant created',
            restaurant: savedRestaurant,
        }));
    } catch (error: any) {
        console.log('Error in createRestaurantController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getAllRestaurantsController = async (req: Request, res: Response) => {
    try {
        const restaurants = await RestaurantSchema.find({});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Restaurants fetched',
            count: restaurants.length,
            restaurants,
        }));
    } catch (error: any) {
        console.log('Error in getAllRestaurantsController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getRestaurantByIdController = async (req: Request, res: Response) => {
    try {
        const {id: restaurantId} = req.params;
        if (isStringInvalid(restaurantId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('restaurantId'),
                errorMsg: 'Restaurant ID is missing',
            }));
        }

        const restaurant = await RestaurantSchema.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFound('restaurant'),
                errorMsg: 'Restaurant not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Restaurant fetched',
            restaurant,
        }));
    } catch (error: any) {
        console.log('Error in getRestaurantByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const deleteRestaurantByIdController = async (req: Request, res: Response) => {
    try {
        const {id: restaurantId} = req.params;
        if (isStringInvalid(restaurantId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('restaurantId'),
                errorMsg: 'Restaurant ID is missing',
            }));
        }

        const restaurant = await RestaurantSchema.findByIdAndDelete(restaurantId);
        if (!restaurant) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFound('restaurant'),
                errorMsg: 'Restaurant not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Restaurant deleted',
        }));
    } catch (error: any) {
        console.log('Error in deleteRestaurantByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {createRestaurantController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantByIdController};
