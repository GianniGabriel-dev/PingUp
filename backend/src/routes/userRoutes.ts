import express from 'express'
import passport from '../config/passport.js'
import { follow } from '../controllers/socialController.js'
import { getUserData } from '../controllers/meController.js'
export const userRouter = express.Router()

userRouter.get("/me",
    passport.authenticate ('jwt', {session:false}),
    getUserData
)

userRouter.post("/follow/:followingId",
    passport.authenticate ('jwt', {session:false}),
    follow
)
