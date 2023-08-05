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

router.put("/update", checkAccessLevel("user"), async (req: Request, res: Response) => {
    try {
        const { update } = req.body
        const token = req.headers.authorization as string
        const userData = await userDataByToken(token)
        if (!userData) return res.status(403).send()

        const mongoResponse = await User.findByIdAndUpdate(userData._id, update)
        res.send(mongoResponse)
    } catch (error) { 
        res.status(400).send()
        console.log("users - index error:", error)
    }
})

export default router
