import { body } from "express-validator";
import { isEmailTaken, isUsernameTaken } from "../services/authServices.js";

//validaciones para registro
export const signupValidator = [
  body("email")
    .notEmpty().trim().withMessage("El email es obligatorio")
    .isEmail().withMessage("Debes ingresar un email válido")
    .isLength({ max: 255 }).withMessage("El email no puede tener más de 255 caracteres")
    .custom(async (email) => {
      const existing = await isEmailTaken(email);
      if (existing) {
        throw new Error("El email ya está en uso");
      }
      return true; //no vale para nada pero se pone por convencion para indicar que la custom validation ha ido bien
    }),

  body("username")
    .notEmpty().trim().withMessage("El username es obligatorio")
    .isLength({ min: 3, max: 30 }).withMessage("El username debe tener entre 3 y 30 caracteres")
    .custom(async (username) => {
      const existing = await isUsernameTaken(username);
      if (existing) {
        throw new Error("El username ya está en uso");
      }
      return true; //no vale para nada pero se pone por convencion para indicar que la custom validation ha ido bien
    }),

  body("password")
    .notEmpty().trim().withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
    .isLength({ max: 255 }).withMessage("La contraseña no puede tener más de 255 caracteres"),

  body("confirmPassword")
    .notEmpty().trim().withMessage("Debes confirmar la contraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];
