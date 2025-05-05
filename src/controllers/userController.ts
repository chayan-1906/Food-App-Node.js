import {Request, Response} from "express";
import {ApiResponse} from "../utils/apiResponse";
import UserModel from "../models/UserModel";
import {generateNotFound} from "../utils/generateErrorCodes";
import {isStringInvalid} from "../routes/helpers";

const getUserController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id} = req.body;

        // find user
        const user = await UserModel.findById(id);

        // validation
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFound('user'),
                errorMsg: 'User not found',
            }));
        }

        // TODO: Hide password from response user object, change the field name from _id to userId

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'User found',
            user,
        }));
    } catch (error: any) {
        console.log('Error in getUserController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const updateUserController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id, userName, phone, address} = req.body;

        // find user
        const user = await UserModel.findById(id);

        // validation
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFound('user'),
                errorMsg: 'User not found',
            }));
        }

        if (!isStringInvalid(userName)) user.userName = userName;
        if (!isStringInvalid(phone)) user.phone = phone;
        if (!isStringInvalid(address)) user.address = address;

        // save user
        await user.save();

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'User updated',
            user,
        }));
    } catch (error: any) {
        console.log('Error in updateUserController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {getUserController, updateUserController};
