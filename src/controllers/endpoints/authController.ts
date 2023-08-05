import { Router, Request, Response } from "express"
import User from "../../database/userSchema"
import bcrypt from 'bcryptjs'
import generateAvatar from "../../utils/generateAvatar"
import Messages from "../../staticData/messages"
import jwt from "jsonwebtoken"
import config from "../../staticData/config"
import userDataByToken from "../../utils/userDataByToken"
import checkUserAccess from '../../utils/checkUserAccess';
import UserTypes from "../../staticData/userTypes"
import checkAccessLevel from "../middleware/accessMiddleware"

const router = Router()

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { login, email, password, tryPassword } = req.body
        if (password != tryPassword) throw "password and tryPassword must be same"
        const encryptedPassword = await bcrypt.hash(password, 10)

        const isEmailExists = await User.findOne({ email })
        const isUsernameExists = await User.findOne({ login })

        if (isEmailExists) return res.json({ error: Messages.registerEmailError })
        if (isUsernameExists) return res.json({ error: Messages.registerUsernameError })

        const mongoResponse = await User.create({
            login: login,
            email: email,
            avatar: await generateAvatar(),
            group: "",
            password: encryptedPassword,
            userAccess: UserTypes.user,
        });

        res.send(mongoResponse)

    } catch (error) {
        console.log("auth - register error:", error)
        res.status(500).send(error)
    }
})

router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ error: Messages.loginUsernameError })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, config.secret, {
            expiresIn: "7d",
        })

        if (res.status(201)) {
            return res.status(200).json({ data: token })
        } else {
            return res.status(500).send()
        }
    }
    res.json({ status: "error", error: Messages.loginPasswordError })
})

router.get("/userData", async (req: Request, res: Response) => {
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

router.get("/checkAccess/:accessLevel", checkAccessLevel(UserTypes.admin), async (req: Request, res: Response) => {
    const { accessLevel } = req.params
    const token = req.headers.authorization as string
    try {
        if (!Object.values(UserTypes).includes(accessLevel)) {
            return res.status(403).send()
        }

        const result = await checkUserAccess(token, accessLevel)

        if (result) return res.status(200).send()
        else return res.status(403).send()

    } catch (error) { 
        res.status(200).send()
        console.log("auth - adminRights:", error)
    }
})

router.get("/checkIfLoggedIn", checkAccessLevel(UserTypes.admin), async (req: Request, res: Response) => {
    const { accessLevel } = req.params
    const token = req.headers.authorization as string
    try {
        if (!Object.values(UserTypes).includes(accessLevel)) {
            return res.status(500).send(200)
        }

        const result = await checkUserAccess(token, accessLevel)

        if (result) return res.status(200).send()
        else return res.status(500).send()

    } catch (error) { 
        res.status(200).send()
        console.log("auth - adminRights:", error)
    }
})


export default router