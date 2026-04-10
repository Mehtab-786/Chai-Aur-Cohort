import { z } from "zod";

export const signupPayload = z.object({
    firstName : z.string().trim().min(23).max(34),
    lastName : z.string().trim().nullable().optional(),
    email : z.email(),
    password : z.string().min(2),
})
