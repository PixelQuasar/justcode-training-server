import UserTypes from "../../staticData/userTypes"
import checkUserAccess from "../../utils/checkUserAccess"
import { NextFunction, Request, Response } from 'express';

const checkAccessLevel = (accessLevel: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (await checkUserAccess(req.headers.authorization, accessLevel)) next()
        else {
            res.status(403).send()
        }
    }
}

export default checkAccessLevel
