import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()
import { authRouter } from './routes/authRoutes'
import "./config/passport"
import passport from 'passport'
import { postsRouter } from './routes/postsRoutes.js'
import { userRouter } from './routes/userRoutes.js'


const app = express()
app.use(cors({
    origin: "http://localhost:5173", // front-end URL
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
}))
app.use(express.json());
app.use(passport.initialize());// passport sirve para proteger rutas, autenticar usuarios,etc
app.use(express.json())// sirve para que express entienda json en las peticiones
app.use(express.urlencoded({ extended: true })); // sirve para que express entienda formularios html en las peticiones

const PORT = process.env.PORT || 3000

app.use("/", postsRouter)
app.use("/", authRouter)
app.use("/", userRouter)


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
