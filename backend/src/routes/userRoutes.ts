import express from 'express'
import passport from '../config/passport.js'
import { follow } from '../controllers/socialController.js'
import { getUserData, updateProfile } from '../controllers/meController.js'
import { uploadMedia } from '../middlewares/uploadMedia.js'
import { validateAvatarImg } from '../validations/mediaUploadValidation.js'
export const userRouter = express.Router()

userRouter.get("/me",
    passport.authenticate ('jwt', {session:false}),
    getUserData
)

userRouter.post("/follow/:followingId",
    passport.authenticate ('jwt', {session:false}),
    follow
)

userRouter.patch("/updateProfile",
    passport.authenticate ('jwt', {session:false}),
    uploadMedia("avatar"),
    validateAvatarImg,
    updateProfile
)