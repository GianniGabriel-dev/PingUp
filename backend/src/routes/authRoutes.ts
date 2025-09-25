import express from 'express'
import {login, signUp } from '../controllers/authController'
export const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', login)