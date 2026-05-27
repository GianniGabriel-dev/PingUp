import express from 'express'
import passport from '../config/passport.js'
import { follow, showNotifications } from '../controllers/socialController.js'
import { getPostsUser, getUserByUsername, getUserData, searchUsers, updateProfile, updateLanguagePreference } from '../controllers/usersController.js'
import { uploadAvatarAndBanner} from '../middlewares/uploadMedia.js'
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
    uploadAvatarAndBanner,
    validateAvatarImg,
    updateProfile
)

userRouter.patch("/updateLanguage",
    passport.authenticate ('jwt', {session:false}),
    updateLanguagePreference
)

userRouter.get("/notifications",
    passport.authenticate ('jwt', {session:false}),
    showNotifications
)

// /search must come before /:username so Express doesn't treat "search" as a username
userRouter.get("/search", searchUsers)

userRouter.get("/:username", optionalAuth, getUserByUsername)

//get post user recibe 'posts' o 'replies' dependiendo del tipo de contenido que se quiera obtener
userRouter.get("/:username/posts", optionalAuth , getPostsUser('posts'))

userRouter.get("/:username/replies", optionalAuth , getPostsUser('replies'))

