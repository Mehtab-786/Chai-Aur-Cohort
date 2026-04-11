import { z } from "zod";

export const signupPayload = z.object({
    firstName : z.string().trim().min(2).max(34),
    lastName : z.string().trim().nullable().optional(),
    email : z.email(),
    password : z.string().min(2),
})
export const signinPayload = z.object({
    email : z.email(),
    password : z.string().min(2),
})