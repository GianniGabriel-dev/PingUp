import express from 'express'
import {login, signUp } from '../controllers/authController'
import { loginValidator, signupValidator } from '../validations/authFormValidation.js'
export const authRouter = express.Router()

authRouter.post('/signup', signupValidator, signUp) // los middlewares se ejecutan en orden, primero se validan los datos y luego se crea el usuraio en la bd
authRouter.post('/login', loginValidator, login)
