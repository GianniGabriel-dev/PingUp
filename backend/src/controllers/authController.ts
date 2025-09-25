import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import { normalSignUp } from '../services/authServices.js';

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

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Tu lógica aquí
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
