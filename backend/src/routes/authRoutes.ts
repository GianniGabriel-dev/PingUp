import express from 'express'
import { login, signUp } from '../controllers/authController.ts'
export const authRouter = express.Router()

authRouter.post('/signup', signUp)
authRouter.get('/login', login)