import { Request, Response, NextFunction } from "express";

export default function handleError(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(err.statusCode || 500).send({ message: err.message });
}