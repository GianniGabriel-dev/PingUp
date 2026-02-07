import { body } from "express-validator";
import {
  isEmailTaken,
  isUsernameOrEmailTaken,
} from "../queries/authServices.js";

//validaciones para registro
export const signupValidator = [
  body("email")
    .notEmpty()
    .trim()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debes ingresar un email válido")
    .isLength({ max: 255 })
    .withMessage("El email no puede tener más de 255 caracteres")
    .custom(async (email) => {
      const existing = await isEmailTaken(email);
      if (existing) {
        throw new Error("El email ya está en uso");
      }
      return true; //no vale para nada pero se pone por convencion para indicar que la custom validation ha ido bien
    }),

  body("username")
    .notEmpty()
    .trim()
    .withMessage("El username es obligatorio")
    .isLength({ max: 30 })
    .withMessage("El username debe tener entre 0 y 30 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("El username no puede contener caracteres especiales")
    .custom(async (username) => {
      const existing = await isUsernameOrEmailTaken(username);
      if (existing) {
        throw new Error("El username ya está en uso");
      }
      return true; //no vale para nada pero se pone por convencion para indicar que la custom validation ha ido bien
    }),

  body("password")
    .notEmpty()
    .trim()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/^(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "La contraseña debe contener al menos una mayúscula y un número"
    )
    .isLength({ max: 255 })
    .withMessage("La contraseña no puede tener más de 255 caracteres"),

  body("confirmPassword")
    .notEmpty()
    .trim()
    .withMessage("Debes confirmar la contraseña")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
];

export const loginValidator = [
  body("identifier")
    .notEmpty()
    .withMessage("Debes indicar email o nombre de usuario")
    .custom(async (value) => {
      // Si parece un email, validamos como email
      if (value.includes("@")) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          throw new Error("El email no es válido");
        }
        if (value.length > 255) {
          throw new Error("El email no puede superar 255 caracteres");
        }
      // Si no parece email, tratamos como username
      } else {
        if (value.length < 3 || value.length > 30) throw new Error("El nombre de usuario debe tener entre 3 y 30 caracteres");
      }
      const existing = await isUsernameOrEmailTaken(value);
      if (!existing) {
          throw new Error("El usuario o email introducidos no existen");
      }

      return true;//indica que la validación ha ido bien
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6, max: 255 })
    .withMessage("La contraseña debe tener entre 6 y 255 caracteres"),
];
