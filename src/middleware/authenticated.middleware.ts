import { Request, Response, NextFunction } from "express";
import { verifyToken } from "@/utils/token";
import userModel from "@/resources/user/user.model";
import Token from "@/utils/interfaces/token.interface";
import HttpException from "@/utils/exceptions/http.exception";
import jwt from "jsonwebtoken";

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if(!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthourized'))
    }

    const accesToken = bearer.split('Bearer ')[1].trim();

    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accesToken);

        if(payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthourized'))
        }

        const user = await userModel.findById(payload.id)
            .select('-password')
            .exec()

        if(!user) {
            return next(new HttpException(401, 'Unauthourized'))
        }

        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthourized')) 
    }
}

export default authenticatedMiddleware;  