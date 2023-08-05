import { Router } from "express";
import loginRouter from "./authController";
import fileRouter from "./fileController";
import materialRouter from "./materialController";
import postRouter from './postContoller'
import userRouter from './userController'

const router = Router()

router.use("/auth", userRouter)
router.use("/auth", loginRouter)
router.use("/files", fileRouter)
router.use("/material", materialRouter)
router.use("/posts", postRouter)

export default router
