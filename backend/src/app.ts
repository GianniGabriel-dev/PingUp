import express from 'express'
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoutes'
import "./config/passport"
import passport from 'passport'
import { postsRouter } from './routes/postsRoutes.js'
dotenv.config()
const app = express()

app.use(express.json());
app.use(passport.initialize());// passport sirve para proteger rutas, autenticar usuarios,etc
app.use(express.json())// sirve para que express entienda json en las peticiones

const PORT = process.env.PORT || 3000

app.use("/", authRouter)
app.use("/", postsRouter)

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
