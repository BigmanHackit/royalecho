import { z } from "zod"

export const EnrollFormSchema = z.object({
    fullName: z.string().min(2).max(100),
    country: z.string().min(2).max(100),
    state: z.string().min(2).max(100),
    mobile: z.string().min(10).max(15),
    email: z.string().email({ message: "Please enter a valid email address"}).trim(),
    course: z.string().min(2).max(100),
})