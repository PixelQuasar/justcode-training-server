import { NextFunction, Request, Response } from "express"
import Post from "../../database/postSchema"

const checkUserRightsOnPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (res.locals.role == "admin" || res.locals.role == "moderator") next()
        
        const post = await Post.findOne({_id: req.body.postId})
        if (!post) throw "error"
        if (res.locals.userId == post.authorId) {
            next()
        }
        else throw "error"
    }
    catch {
        res.sendStatus(401)
    }
}

export default checkUserRightsOnPost