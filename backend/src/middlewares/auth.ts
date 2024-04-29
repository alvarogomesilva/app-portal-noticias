import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {

    const authToken = req.headers.authorization;

    if (!authToken) return res.status(401).end();
    const token = authToken.substring(7)
    
    try {
        const { sub } = verify(token, process.env.JWT_SECRET)
        req.userId = sub as string;

        return next();

    } catch (err) {
        return res.status(401).end();
    }

}