import { Router, Request, Response } from 'express';
import userDataByToken from '../../utils/userDataByToken';
import User from '../../database/userSchema';

const router = Router()

router.get("/", async (req: Request, res: Response) => {
    const token = req.headers.authorization as string
    try {
        const userData = await userDataByToken(token)
        if (!userData) return res.status(403).send()
        console.log(userData)
        const mongoResponse = await User.findOne({ email: userData.email })
        res.status(200).send(mongoResponse)

    } catch (error) { 
        res.status(400).send()
        console.log("auth - userData error:", error)
    }
})

export default router
