import { body } from "express-validator";

//validaciones para registro
export const postValidator = [
  body("content")
    .notEmpty()
    .trim()
    .withMessage("El post no puede estar vacío")

    .isLength({ max: 280 })
    .withMessage("El post no puede tener más de 280 caracteres"),
    body("imageUrl")
]