import { z } from "zod"
// avatar: null,
//         appname: null,
//         description: null,
//         device_type: "android",
//         email_feedback: null,
//         download: null,
//         link: null,
export const FormSchema = z.object({
    device_type: z
        .string()
        .trim()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    appname: z
        .string()
        .trim()
        .min(2, {
            message: "Name must be at least 2 characters.",
        }),
    description: z
        .string()
        .trim()
        .min(2, {
            message: "Website must be at least 2 characters.",
        })
})

