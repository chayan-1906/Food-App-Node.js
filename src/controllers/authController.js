import {ApiResponse} from "../utils/apiResponse.js";
import {generateMissingCode} from "../utils/generateErrorCodes.js";
import {isStringInvalid} from "../routes/helpers.js";
import UserModel from "../models/UserModel.js";

const registerController = async (req, res) => {
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
        console.log('existingUser:'.bold.bgBlue, existingUser);
        if (existingUser) {
            return res.status(400).send(new ApiResponse({
                success: false,
                errorCode: 'EMAIL_REGISTERED',
                errorMsg: 'Email already registered',
            }));
        }

        // create new user
        const user = await UserModel.create({userName, email, password, phone, address});

        res.status(201).send(new ApiResponse({
            success: true,
            message: 'User successfully registered',
            user,
        }));
    } catch (error) {
        console.log('Error in registerController:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}

export {registerController};
