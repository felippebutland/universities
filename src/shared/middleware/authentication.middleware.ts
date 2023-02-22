import { Request, Response, NextFunction } from 'express';
import jwt, {verify} from 'jsonwebtoken';
import {UnauthorizedError} from "../errors";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { JWT_SECRET } = process.env;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("Token not provided");
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        throw new UnauthorizedError("Token error");
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        throw new UnauthorizedError("Token mal formatted");
    }


    if(JWT_SECRET) {
        jwt.verify(token, JWT_SECRET.toString(), (err, decoded) => {
            if(decoded) next();
            if (err) return res.status(401).json({ message: 'Token invalid' });
            if(decoded) {
                return next();
            }
        });

    }
    throw new UnauthorizedError("No authorized")

}