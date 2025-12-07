import z from "zod";

export const registerSchema = z.object({
    username: z
    .string()
    .trim()
    .min(1, "¿Como te llamas?")
    .max(30, "El nombre de usuario no puede tener más de 30 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "El nombre de usuario no puede contener caracteres especiales"),

    email: z
    .email("Introduce un email válido")
    .trim()
    .max(255, "El email no puede tener más de 255 caracteres"),

    password: z
    .string()
    .trim()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(255, "La contraseña no puede tener más de 255 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)/, "La contraseña debe contener al menos una mayúscula y un número"),

    confirmPassword: z.string().trim().min(6, "Repite la contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path:["confirmPassword"]

})

export const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty("Introduce un email o nombre de usuario")
    .refine((value) => {
      if (value.includes("@")) {
        // Validación como email
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 255;
      } else {
        // Validación como username
        return /^[a-zA-Z0-9_]+$/.test(value) && value.length >= 3 && value.length <= 30;
      }
    }, {
      message: "Introduce un email o nombre de usuario válido",
    }),

  password: z
    .string()
    .nonempty("Introduce tu contraseña")
    .min(6, "Introduce una contraseña válida")
    .max(255, "Introduce una contraseña válida"),
});