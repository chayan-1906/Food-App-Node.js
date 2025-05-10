import {NextFunction, Request, Response} from "express";
import JWT from "jsonwebtoken";
import {JWT_SECRET} from "../config/config";
import {ApiResponse} from "../utils/ApiResponse";
import {isStringInvalid} from "../utils/Helpers";
import {generateMissingCode} from "../utils/generateErrorCodes";

interface AuthRequest extends Request {
    body: {
        id?: string;
        email?: string;
    };
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // get token
        const token = req.headers['authorization']?.split(' ')[1];
        if (isStringInvalid(token)) {
            res.status(401).json(new ApiResponse({
                success: false,
                errorCode: generateMissingCode('auth_token'),
                errorMsg: 'No token. Authorization denied',
            }));
            return;
        }

        const decoded = await new Promise<JWT.JwtPayload>((resolve, reject) => {
            JWT.verify(token!, JWT_SECRET!, (err: JWT.VerifyErrors | null, decoded: JWT.JwtPayload | string | undefined) => {
                if (err) {
                    reject(err);
                } else if (!decoded || typeof decoded === 'string') {
                    reject(new Error('Invalid token payload'));
                } else {
                    resolve(decoded);
                }
            });
        });

        req.body.id = decoded.id;
        req.body.email = decoded.email;
        next();
    } catch (error: any) {
        console.log('Error in authMiddleware:'.bgRed.white.bold, error);
        res.status(500).send(new ApiResponse({
            success: false,
            error,
            errorMsg: 'Something went wrong',
        }));
    }
}
