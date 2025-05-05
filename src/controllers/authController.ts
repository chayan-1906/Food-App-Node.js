import {Request, Response} from "express";
import {ApiResponse} from "../utils/apiResponse";
import {generateMissingCode, generateNotFound} from "../utils/generateErrorCodes";
import {isStringInvalid} from "../routes/helpers";
import UserModel from "../models/UserModel";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import {JWT_SECRET} from "../config/config";

const registerController = async (req: Request, res: Response) => {
    try {
        const {userName, email, password, phone, address} = req.body;

        // validation
        if (isStringInvalid(userName)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('username'),
                errorMsg: 'User name is missing',
            }));
        }
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
        if (!Array.isArray(address)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('address'),
                errorMsg: 'Address must be an array',
            }));
        }
        if (isStringInvalid(phone)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('phone'),
                errorMsg: 'Phone is missing',
            }));
        }

        // check user
        const existingUser = await UserModel.findOne({email});
        console.log('existingUser:'.bgBlue.white.bold, existingUser);
        if (existingUser) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: 'EMAIL_REGISTERED',
                errorMsg: 'Email already registered',
            }));
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));

        // create new user
        const user = await UserModel.create({userName, email, password: hashedPassword, phone, address});

        res.status(201).send(new ApiResponse({
            success: true,
            message: 'User successfully registered',
            user,
        }));
    } catch (error: any) {
        console.log('Error in registerController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

const loginController = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

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

        // check user password | compare password
        const userByEmail = await UserModel.findOne({email});
        console.log('userByEmail:'.bgBlue.white.bold, userByEmail);
        if (!userByEmail) {
            return res.status(404).send(new ApiResponse({
                success: false,
                errorCode: generateNotFound('user'),
                errorMsg: 'User not found',
            }));
        }
        console.log('password:'.bgBlack.white, userByEmail.password);
        const isMatched = await bcrypt.compare(password, userByEmail.password);
        if (!isMatched) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: 'INVALID_CREDENTIALS',
                errorMsg: 'Invalid credentials',
            }));
        }

        // TODO: Hide password from response user object, change the field name from _id to userId
        const token = JWT.sign({id: userByEmail._id, email: userByEmail.email}, JWT_SECRET!, {expiresIn: '30d'});
        res.status(200).send(new ApiResponse({
            success: true,
            message: 'Login successful',
            user: userByEmail,
            token,
        }));
    } catch (error: any) {
        console.log('Error in loginController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {registerController, loginController};
