import { Request, Response, NextFunction } from "express";

const authorize = async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.header('Authorization') || req.headers.Authorization
    if (!access_token) {
        throw new Error("user don't have permission to access data")
    }

    return next();
}

export default authorize;