import express from 'express'
import passport from '../config/passport.js'
import { postValidator } from '../validations/postsValidations.js'

import { getPosts, likePost, newPost } from '../controllers/postsController.js'
export const postsRouter = express.Router()

postsRouter.post('/post', 
    postValidator, 
    passport.authenticate ('jwt', {session:false}), 
    newPost
) 
postsRouter.get("/post", getPosts)

postsRouter.post("/like/:post_id",
    passport.authenticate ('jwt', {session:false}),
    likePost
)


