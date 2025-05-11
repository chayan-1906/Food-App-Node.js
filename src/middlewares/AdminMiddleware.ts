import {AuthRequest} from "./AuthMiddleware";
import {NextFunction, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import UserModel from "../models/UserSchema";
import {generateInvalidCode, generateNotFoundCode} from "../utils/generateErrorCodes";

export const adminMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {id} = req.body;
        const user = await UserModel.findById(id);

        if (!user) {
            res.status(404).json(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
            return;
        }
        if (user.userType !== 'admin') {
            res.status(401).json(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('access'),
                errorMsg: 'Invalid access',
            }));
            return;
        }

        next();
    } catch (error: any) {
        console.log('Error in adminMiddleware:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}
