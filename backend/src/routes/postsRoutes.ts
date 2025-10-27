import express from 'express'
import passport from '../config/passport.js'
import { commentValidator, postValidator } from '../validations/postsValidations.js'

import { getPosts, like, newPost, translatePost } from '../controllers/postsController.js'
import { uploadMedia } from '../middlewares/uploadMedia.js'
import { validatePostMedia } from '../validations/mediaUploadValidation.js'
export const postsRouter = express.Router()

postsRouter.post('/post', 
    passport.authenticate ('jwt', {session:false}),
    uploadMedia("media"),
    validatePostMedia, 
    postValidator, 
    newPost
) 
postsRouter.get("/post", getPosts)

postsRouter.post("/like/:post_id",
    passport.authenticate ('jwt', {session:false}),
    like
)
postsRouter.post("/post/:post_id/translate", translatePost)



