import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// To define a properties into Request interface
declare global {
    namespace Express {
        interface Request {
            currentuser?: UserPayload;
        }
    }
}

export const currentuser = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(
            req.session.jwt,
            process.env.JWT_TOKEN!
        ) as UserPayload;
        
        req.currentuser = payload;

    } catch (err) {}

    next();
}