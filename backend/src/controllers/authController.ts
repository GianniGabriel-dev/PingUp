import { Request, Response } from 'express';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password, confirmPassword, username}= req.body
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
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
