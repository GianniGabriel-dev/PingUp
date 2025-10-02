import express from 'express'
import passport from '../config/passport.js'
import { follow } from '../controllers/socialController.js'
export const userRouter = express.Router()

userRouter.post("/follow/:followingId",
    passport.authenticate ('jwt', {session:false}),
    follow
)
