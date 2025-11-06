import express from 'express'
import {login, signUp } from '../controllers/authController'
import passport from '../config/passport.js'
import { loginValidator, signupValidator } from '../validations/authFormValidation.js'
import { uploadAvatar } from '../controllers/mediaController.js'
export const authRouter = express.Router()

authRouter.post('/signup', signupValidator, signUp) // los middlewares se ejecutan en orden, primero se validan los datos y luego se crea el usuraio en la bd
authRouter.post('/login', loginValidator, login)

authRouter.put('/avatar', 
    passport.authenticate ('jwt', {session:false}), ...uploadAvatar
) 