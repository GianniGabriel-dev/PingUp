import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import { getUserByEmailOrUsername, normalSignUp } from '../services/authServices.js';
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response): Promise<Response> => {
  const errors = validationResult(req)
    // si hay errores, se devuelve un error 400 con los detalles de los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const {email, password, username}= req.body

    const encryptedPassword= await bcrypt.hash(password, 10)
    const newUser= await normalSignUp(email, username, encryptedPassword)
    return res.status(201).json({
        msg: "new user created",
        id: newUser.id,
        username: newUser.username,
    })
  } catch (error:any) {
    console.error(error.message)
    return res.status(500).json({ error: 'Error creating users' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
    const errors = validationResult(req)
    // si hay errores, se devuelve un error 400 con los detalles de los errores
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { identifier, password}= req.body
    const user= await getUserByEmailOrUsername(identifier)
    //aunque user se valida anteriromente, typscript no lo sabe y crea advertenicas
    if(!user) return res.status(401).json({error: "Usuario o email no encontrado"})

    const match= await bcrypt.compare(password, user?.password || "")//si se regista con oAuth no tiene password, para evitar error le paso cadena vacía
    if(!match){
        return res.status(401).json({error: "Contraseña incorrecta"})
    }
    //payload que será guardado en el token jwt
    const payload={
      id: user.id,
      username: user.username
    }
    //se firma el token con la clave secreta y se le da una fecha de expiracion
    const token=jwt.sign(payload, process.env.JWT_SECRET as string,{
      expiresIn: '3d'
    })
    return res.status(200).json({
      token,
      message:"login successful",
      user:{
        id:user.id,
        username: user.username
      }
    })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
