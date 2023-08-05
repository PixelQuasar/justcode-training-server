import { Router, Request, Response } from 'express';
import userDataByToken from '../../utils/userDataByToken';
import User from '../../database/userSchema';
import checkAccessLevel from '../middleware/accessMiddleware';

const router = Router()

router.get("/", checkAccessLevel("user"), async (req: Request, res: Response) => {
    try {
        const mongoResponse = await User.find({ })
        res.status(200).send(mongoResponse)

    } catch (error) { 
        res.status(400).send()
        console.log("users - index error:", error)
    }
})

router.get("/:userId", checkAccessLevel("user"), async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const mongoResponse = await User.findById(userId)
        res.send(mongoResponse)
    } catch (error) { 
        res.status(400).send()
        console.log("users - index error:", error)
    }
})

export default router
