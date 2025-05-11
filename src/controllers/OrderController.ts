import mongoose from "mongoose";
import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import FoodSchema from "../models/FoodSchema";
import OrderSchema, {paymentTypes} from "../models/OrderSchema";
import {isListEmpty, isNumberInvalid, isStringInvalid} from "../utils/Helpers";
import {generateInvalidCode, generateMissingCode, generateNotFoundCode} from "../utils/generateErrorCodes";

const placeOrderController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id: userId, cart, paymentMethod} = req.body;

        // validation
        if (isListEmpty(cart)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('cart'),
                errorMsg: 'Cart is missing',
            }));
        }
        if (!paymentTypes.includes(paymentMethod)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('payment_method'),
                errorMsg: 'Invalid payment method',
            }));
        }

        // calculate price
        let total = 0;
        for (const item of cart) {
            if (isStringInvalid(item.food)) {
                return res.status(404).send(new ApiResponse({
                    success: false,
                    errorCode: generateMissingCode('foodId'),
                    errorMsg: 'Food ID is missing',
                }));
            }
            if (isNumberInvalid(item.quantity)) {
                return res.status(404).send(new ApiResponse({
                    success: false,
                    errorCode: generateMissingCode('quantity'),
                    errorMsg: 'Quantity is missing',
                }));
            }
            if (item.quantity <= 0) {
                return res.status(404).send(new ApiResponse({
                    success: false,
                    errorCode: generateInvalidCode('quantity'),
                    errorMsg: 'Invalid quantity',
                }));
            }

            const food = await FoodSchema.findById(item.food);
            if (!food) {
                return res.status(404).send(new ApiResponse({
                    success: false,
                    errorCode: generateNotFoundCode('food'),
                    errorMsg: 'Food not found',
                }));
            }
            total += item.quantity * food.price;
        }
        total = parseFloat(total.toFixed(2));

        // place order
        const placedOrder = await OrderSchema.create({
            foods: cart,
            payment: {
                amount: total,
                method: paymentMethod,
            },
            buyer: userId,
        });

        return res.status(201).send(new ApiResponse({
            success: true,
            message: 'Order placed',
            order: placedOrder,
        }));
    } catch (error: any) {
        console.log('Error in placeOrderController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getAllOrdersController = async (req: Request, res: Response) => {
    try {
        const orders = await OrderSchema.find({});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Orders fetched',
            count: orders.length,
            orders,
        }));
    } catch (error: any) {
        console.log('Error in getAllOrdersController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getOrderByIdController = async (req: Request, res: Response) => {
    try {
        const {id: orderId} = req.params;
        if (isStringInvalid(orderId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('orderId'),
                errorMsg: 'Order ID is missing',
            }));
        }

        const order = await OrderSchema.findById(orderId);
        if (!order) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('order'),
                errorMsg: 'Order not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Order fetched',
            order,
        }));
    } catch (error: any) {
        console.log('Error in getOrderByIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const getOrdersByUserIdController = async (req: Request, res: Response) => {
    try {
        const {id: userId} = req.body;
        if (isStringInvalid(userId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
        }

        const orders = await OrderSchema.find({buyer: userId});

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Orders fetched',
            orders,
        }));
    } catch (error: any) {
        console.log('Error in getOrdersByUserIdController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const modifyOrderStatusController = async (req: Request, res: Response) => {
    try {
        const {id: orderId} = req.params;
        const {status} = req.body;

        // validation
        if (isStringInvalid(orderId)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('orderid'),
                errorMsg: 'Order ID is missing',
            }));
        }
        if (isStringInvalid(status)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('status'),
                errorMsg: 'Invalid order status',
            }));
        }

        const updatedOrder = await OrderSchema.findByIdAndUpdate(orderId, {status}, {new: true});
        if (!updatedOrder) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('order'),
                errorMsg: 'Order not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Order status modified',
            order: updatedOrder,
        }));
    } catch (error: any) {
        console.log('Error in modifyOrderStatusController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const cancelOrderById = async (req: Request, res: Response) => {
    try {
        const {id: orderId} = req.params;
        if (isStringInvalid(orderId)) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('orderId'),
                errorMsg: 'Order ID is missing',
            }));
        }

        const order = await OrderSchema.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('order'),
                errorMsg: 'Order not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Order cancelled',
        }));
    } catch (error: any) {
        console.log('Error in cancelOrderById:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {placeOrderController, getAllOrdersController, getOrderByIdController, getOrdersByUserIdController, modifyOrderStatusController, cancelOrderById};
