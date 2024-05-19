import { z } from "zod"

export const FormSchema = z.object({
    bio: z
        .string()
        .trim()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    username: z
        .string()
        .trim()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    website: z
        .string()
        .trim()
        .min(2, {
            message: "Website must be at least 2 characters.",
        })
})

