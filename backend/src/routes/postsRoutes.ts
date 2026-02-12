import express from 'express'
import passport from '../config/passport.js'
import { postValidator } from '../validations/postsValidations.js'

import { getPosts, like, newPost, translatePost } from '../controllers/postsController.js'
import { uploadMedia } from '../middlewares/uploadMedia.js'
import { validatePostMedia } from '../validations/mediaUploadValidation.js'
import { optionalAuth } from '../middlewares/optionalAuth.js'
export const postsRouter = express.Router()

postsRouter.post('/post', 
    passport.authenticate ('jwt', {session:false}),
    uploadMedia("media"),
    validatePostMedia, 
    postValidator, 
    newPost
) 
postsRouter.get("/post", optionalAuth , getPosts)

postsRouter.get("/post/:post_id", optionalAuth , getPosts)

postsRouter.post("/like/:post_id",
    passport.authenticate ('jwt', {session:false}),
    like
)
postsRouter.post("/post/:post_id/translate", translatePost)



