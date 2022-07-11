import { NextFunction, Request, Response } from "express"

export default async function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if(error.type===404) return res.sendStatus(404);
    return res.sendStatus(500);
}