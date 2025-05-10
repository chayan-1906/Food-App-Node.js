import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import UserSchema from "../models/UserSchema";
import {generateInvalidCode, generateMissingCode, generateNotFoundCode} from "../utils/generateErrorCodes";
import {isStringInvalid} from "../utils/Helpers";
import bcrypt from "bcryptjs";

const getUserController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id} = req.body;

        // find user
        const user = await UserSchema.findById(id);

        // validation
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
        }

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
        const user = await UserSchema.findById(id);

        // validation
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
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
            message: 'User has been updated',
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

const updatePasswordController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id, oldPassword, newPassword} = req.body;

        // find user
        const user = await UserSchema.findById(id);
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
        }

        // validation
        if (isStringInvalid(oldPassword) || isStringInvalid(newPassword)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('password'),
                errorMsg: 'Old or new password is/are missing',
            }));
        }

        const isMatched = await bcrypt.compare(oldPassword, user.password);
        if (!isMatched) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('password'),
                errorMsg: 'Invalid password',
            }));
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(newPassword, bcrypt.genSaltSync(10));
        user.password = hashedPassword;

        // save user
        await user.save();

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Password has been updated',
        }));
    } catch (error: any) {
        console.log('Error in resetPasswordController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const resetPasswordController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {email, password, answer} = req.body;

        // validation
        if (isStringInvalid(email)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('email'),
                errorMsg: 'Email is missing',
            }));
        }
        if (isStringInvalid(password)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('password'),
                errorMsg: 'Password is missing',
            }));
        }
        if (isStringInvalid(answer)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('answer'),
                errorMsg: 'Answer is missing',
            }));
        }

        // find user
        const user = await UserSchema.findOne({email});
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
        }

        if (user.answer !== answer) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateInvalidCode('answer'),
                errorMsg: 'Invalid answer',
            }));
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
        user.password = hashedPassword;

        // save user
        await user.save();

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'Password has been reset',
        }));
    } catch (error: any) {
        console.log('Error in resetPasswordController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const deleteAccountController = async (req: Request, res: Response) => {
    try {
        console.log('requestBody:'.bgYellow.bold, req.body);
        const {id} = req.body;

        // find user
        const user = await UserSchema.findByIdAndDelete(id);

        // validation
        if (!user) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFoundCode('user'),
                errorMsg: 'User not found',
            }));
        }

        return res.status(200).send(new ApiResponse({
            success: true,
            message: 'User has been deleted',
        }));
    } catch (error: any) {
        console.log('Error in deleteAccountController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteAccountController};
