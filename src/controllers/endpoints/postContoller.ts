import express, { Request, Response } from 'express';
import checkAccessLevel from '../middleware/accessMiddleware';
import UserTypes from '../../staticData/userTypes';
import Post from '../../database/postSchema';
const router = express()

router.get("/", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.params.page) ?? 0
        const mongoResponse = await Post.find().skip(page * 20).limit(page * 20)
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log("material - index error:", error)
        return res.status(400).send()
    }
})

router.get("/:id", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const mongoResponse = await Post.findOne( {_id: id} )
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log("material - index error:", error)
        return res.status(400).send()
    }
})

router.post("/", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const {name, link, description, photoURL} = req.body

        await Post.create({
            name: name,
            link: link,
            description: description,
            photoURL: photoURL,
            isDeprecated: false
        })

        res.status(200).send()
    } catch (error) {
        console.log("material - addMaterial error:", error)
        res.status(500).send()
    }
})

export default router
