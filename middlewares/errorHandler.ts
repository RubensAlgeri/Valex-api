import { NextFunction, Request, Response } from "express"

export default async function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if(error.type===404) return res.sendStatus(404);
    if(error.type===401) return res.sendStatus(401);
    return res.sendStatus(500);
}