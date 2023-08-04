import { Request, Response, Router } from "express";
import checkUserAccess from "../../utils/checkUserAccess";
import UserTypes from "../../staticData/userTypes";
import Material from "../../database/materialSchema";
import checkAccessLevel from "../middleware/accessMiddleware";
const router = Router()

router.get("/", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.params.page) ?? 0
        const mongoResponse = await Material.find().skip(page * 20).limit(page * 20)
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log("material - index error:", error)
        return res.status(500).send()
    }
})

router.get("/:id", checkAccessLevel(UserTypes.user), async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const mongoResponse = await Material.findOne( {_id: id} )
        res.status(200).send(mongoResponse)
    }
    catch (error) {
        console.log("material - findById error:", error)
        return res.status(500).send()
    }
})

router.post("/addMaterial", checkAccessLevel(UserTypes.editor), async (req: Request, res: Response) => {
    try {
        const {name, link, description, photoURL} = req.body

        await Material.create({
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
