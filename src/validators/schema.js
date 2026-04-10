import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z.object({
    email : z.string().min(2, "Must have morethan 2 characters")
    .refine( val => emailRegex.test(val) , "Email is required"),
    password : z.string().min(3, "Password must be morethan 3 characters"),
    confirmPassword : z.string().min(3, "Confirm password is required"),
    role: z.enum(["USER", "ADMIN"]).optional().default("USER") 
}).refine( inp => inp.password === inp.confirmPassword, {
    message : "Password do not match",
    path : ["confirmPassword"]
})


export const loginSchema = z.object({
    email : z.string().min(2, "Email is required")
    .refine( val => emailRegex.test(val) , {
        message : "Email invalid"
    }),
    password : z.string().min(3, "Password must be least 3 characters"),
    rememberMe: z.boolean().optional()
})
