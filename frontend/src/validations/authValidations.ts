import z from "zod";

export const registerSchema = z.object({
    username: z
    .string()
    .trim()
    .min(1, "¿Como te llamas?")
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