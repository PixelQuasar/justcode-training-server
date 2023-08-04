import express, { Request, Response } from 'express';
import checkAccessLevel from '../middleware/accessMiddleware';
import UserTypes from '../../staticData/userTypes';
import Post from '../../database/postSchema';
import checkUser from '../middleware/checkUser';
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
        const {title, content, photosUrl} = req.body
        const userId = res.locals.userId

        if (!title || !(content || photosUrl)) res.status(400).send()

        const mongoResponse = await Post.create({
            authorId: userId,
            title: title,
            content: content,
            likes: 0,
            views: 1
        })

        res.send(mongoResponse)
    } catch (error) {
        console.log("material - addMaterial error:", error)
        res.status(500).send()
    }
})

router.put("/", checkAccessLevel(UserTypes.user), checkUser, async (req: Request, res: Response) => {
    try {
        const update = req.body.update
        const postId = req.body.postId

        const mongoResponse = await Post.findByIdAndUpdate(postId, update)

        res.send(mongoResponse)
    }
    catch {

    }
})

export default router
