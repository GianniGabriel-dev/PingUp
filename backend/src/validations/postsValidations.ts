import { body } from "express-validator";

//validaciones para posts
export const postValidator = [
  body("content")
    .optional()
    .trim()
    .isLength({ max: 280 })
    .withMessage("El post no puede tener más de 280 caracteres"),
]
