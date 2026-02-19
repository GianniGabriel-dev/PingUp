import express from 'express'
import passport from '../config/passport.js'
import { follow } from '../controllers/socialController.js'
import { getPostsUser, getUserByUsername, getUserData, updateProfile } from '../controllers/usersController.js'
import { uploadMedia } from '../middlewares/uploadMedia.js'
import { validateAvatarImg } from '../validations/mediaUploadValidation.js'
import { optionalAuth } from '../middlewares/optionalAuth.js'
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

userRouter.get("/:username", getUserByUsername)

//get post user recibe false o true dependiendo de si se quieren obtener solo los posts originales o también las respuestas
userRouter.get("/:username/posts", optionalAuth , getPostsUser(false))

userRouter.get("/:username/replies", optionalAuth , getPostsUser(true))