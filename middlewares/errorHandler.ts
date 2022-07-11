import { NextFunction, Request, Response } from "express"

export default async function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
    if(error.response.data.message === "API rate limit exceeded for 170.244.250.147. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)"){
        return res.status(401).send(error.response.data.message)
    }
    if(error.response.data.message === "Not Found"){
        return res.status(404).send("User not found")
    }

    return res.sendStatus(500);
}