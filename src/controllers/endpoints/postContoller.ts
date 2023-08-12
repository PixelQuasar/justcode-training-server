import express, { Request, Response } from 'express';
import checkAccessLevel from '../middleware/accessMiddleware';
import UserTypes from '../../staticData/userTypes';
import Post from '../../database/postSchema';
import checkUserRightsOnPost from '../middleware/checkUser';
const router = express()

router.get("/", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.params.page) ?? 0
        const mongoResponse = await Post.find().skip(page * 20).limit(20)
        res.send(mongoResponse)
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
        if (!mongoResponse) throw "not found"
        
        const updateResponse = await Post.findOneAndUpdate( {_id: id}, {views: mongoResponse.views + 1} )
        res.send(mongoResponse)
    }
    catch (error) {
        console.log("material - index error:", error)
        return res.status(400).send()
    }
})

router.get("/search/:searchString", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const { searchString } = req.params
        const mongoResponse = await Post.find({$text: { $search: searchString } })
        res.send(mongoResponse)
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

        console.log(title)
        // if (!title || !(content || photosUrl)) res.status(400).send()

        const mongoResponse = await Post.create({
            authorId: userId,
            title: title,
            content: content,
            photosUrl: photosUrl.split(" "),
            likes: 0,
            views: 1
        })

        res.send(mongoResponse)
    } catch (error) {
        console.log("material - addMaterial error:", error)
        res.status(500).send()
    }
})

router.put("/", checkAccessLevel(UserTypes.user), checkUserRightsOnPost, async (req: Request, res: Response) => {
    try {
        const update = req.body.update
        const postId = req.body.postId

        const mongoResponse = await Post.findByIdAndUpdate(postId, update)

        res.send(mongoResponse)
    }
    catch {
        res.send(400)
    }
})

router.delete("/", checkAccessLevel(UserTypes.user), checkUserRightsOnPost, async (req: Request, res: Response) => {
    try {
        const postId = req.body.postId

        const mongoResponse = await Post.findByIdAndDelete(postId)

        res.send(mongoResponse)
    }
    catch {
        res.send(400)
    }
})

export default router
