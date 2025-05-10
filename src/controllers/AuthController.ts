import {Request, Response} from "express";
import {ApiResponse} from "../utils/ApiResponse";
import {generateInvalid, generateMissingCode, generateNotFound} from "../utils/generateErrorCodes";
import {isStringInvalid} from "../utils/Helpers";
import UserSchema from "../models/UserSchema";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import {JWT_SECRET} from "../config/config";

const registerController = async (req: Request, res: Response) => {
    try {
        const {userName, email, password, address, phone, answer} = req.body;

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
        if (isStringInvalid(answer)) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('answer'),
                errorMsg: 'Answer is missing',
            }));
        }

        // check user
        const existingUser = await UserSchema.findOne({email});
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
        const savedUser = await UserSchema.create({userName, email, password: hashedPassword, address, phone, answer});

        res.status(201).send(new ApiResponse({
            success: true,
            message: 'User has been registered',
            user: savedUser,
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
        const userByEmail = await UserSchema.findOne({email});
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
                errorCode: generateInvalid('credentials'),
                errorMsg: 'Invalid credentials',
            }));
        }

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
